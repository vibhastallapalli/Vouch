// MOCK issuer service. Two fake institutions (an income issuer and a rental
// reference issuer) sign credential JSON per interface.md section 3, seeded
// onto an approved-issuer registry (section 11). Keys are generated locally
// and deterministically; the SIGNATURES ARE REAL, the institutions are fake.
//
// Signature scheme: Ed25519 (Node stdlib). interface.md section 3 names
// Schnorr-over-Jubjub for IN-CIRCUIT verification, but the registry-check
// circuit does not exist yet and the interface flags that path as maybe
// infeasible with a hash-membership fallback. So this mock signs with a real,
// verifiable curve now; when the circuit lands, swap the keygen/sign helpers
// for Jubjub (or the fallback) and re-run. Only the signature bytes change.
//
// subjectCommitment (C) is a MOCK stand-in: the real C = persistentCommit(...)
// is computed in the applicant's wallet with Midnight's hash primitives, which
// this off-chain script cannot reproduce. Both credentials in a set share one
// C, which is the property that matters (interface.md section 2).
//
// Run: node issuer/mint.mjs  -> writes issuer/out/ then self-verifies.

import { createPrivateKey, createPublicKey, sign, verify, createHash } from 'node:crypto'
import { mkdirSync, writeFileSync, readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const OUT = join(dirname(fileURLToPath(import.meta.url)), 'out')
const DEMO_NOW = Math.floor(Date.UTC(2026, 6, 18) / 1000) // 18 Jul 2026, the demo date

// --- crypto helpers ---------------------------------------------------------

const ED25519_PKCS8_PREFIX = Buffer.from('302e020100300506032b657004220420', 'hex')
const sha256 = (...parts) => {
  const h = createHash('sha256')
  for (const p of parts) h.update(p)
  return h.digest()
}
const seed = (label) => sha256('rentpool:seed:' + label) // 32 deterministic bytes

// Ed25519 keypair from a fixed 32-byte seed, so every mint is reproducible.
function keyFromSeed(label) {
  const der = Buffer.concat([ED25519_PKCS8_PREFIX, seed(label)])
  const priv = createPrivateKey({ key: der, format: 'der', type: 'pkcs8' })
  const pubHex = Buffer.from(createPublicKey(priv).export({ format: 'jwk' }).x, 'base64url').toString('hex')
  return { priv, pubHex }
}

// Canonical serialization: JSON with recursively sorted keys, so the signer and
// verifier hash identical bytes regardless of field order.
function canonical(v) {
  if (Array.isArray(v)) return '[' + v.map(canonical).join(',') + ']'
  if (v && typeof v === 'object')
    return '{' + Object.keys(v).sort().map((k) => JSON.stringify(k) + ':' + canonical(v[k])).join(',') + '}'
  return JSON.stringify(v)
}

// "signature over H(canonical serialization of all fields above)", domain-tagged
// per interface.md section 4 ("rentpool:cred").
const credDigest = (fields) => sha256('rentpool:cred', '\0', canonical(fields))

// --- issuers and registry ---------------------------------------------------

const incomeIssuer = { issuer: 'mock-northline-payroll', label: 'Northline Payroll', type: 'income', ...keyFromSeed('issuer:income') }
const refIssuer = { issuer: 'mock-renttrack-payments', label: 'RentTrack Payments', type: 'reference', ...keyFromSeed('issuer:reference') }

const registry = {
  note: 'MOCK approved-issuer registry. Seeded by us, not a live authority (interface.md section 11).',
  issuers: [incomeIssuer, refIssuer].map(({ issuer, label, type, pubHex }) => ({ issuer, label, type, publicKey: pubHex })),
}

// --- demo applicants (A/B/C from app/src/data.js) ---------------------------
// Every set clears the hard badges by construction (interface.md section 6):
// income >= 3 * 2200 = 6600, monthsRented >= 12, lateCount <= 2, deposit true.

const ISSUED_AT = Math.floor(Date.UTC(2026, 0, 12) / 1000)
const EXPIRES_AT = Math.floor(Date.UTC(2027, 0, 12) / 1000)

const applicants = [
  { id: 'A', name: 'Maya Okafor', dob: '1994-03-11', contact: 'maya@example.com', monthlyIncome: 7400, monthsRented: 31, lateCount: 1, depositReturned: true },
  { id: 'B', name: 'Daniel Roy', dob: '1990-08-02', contact: 'daniel@example.com', monthlyIncome: 6800, monthsRented: 20, lateCount: 0, depositReturned: true },
  { id: 'C', name: 'Lena Park', dob: '1996-11-23', contact: 'lena@example.com', monthlyIncome: 6600, monthsRented: 14, lateCount: 2, depositReturned: true },
]

// MOCK C: bind both credentials of a set to one commitment. pk = H(secret),
// C = H(nameHash, dobHash, contactHash, pk, r); the real value is a wallet-side
// persistentCommit this script cannot reproduce.
function subjectCommitment(a) {
  const pk = sha256('rentpool:pk', '\0', seed('s:' + a.id))
  return sha256('rentpool:idc', '\0', sha256(a.name), sha256(a.dob), sha256(a.contact), pk, seed('r:' + a.id)).toString('hex')
}

function issue(issuer, type, subjectCommitment, id, claims) {
  const fields = {
    credentialId: `${id}-${type}`,
    issuer: issuer.issuer,
    issuerPublicKey: issuer.pubHex,
    subjectCommitment,
    type,
    claims,
    issuedAt: ISSUED_AT,
    expiresAt: EXPIRES_AT,
  }
  return { ...fields, signature: sign(null, credDigest(fields), issuer.priv).toString('hex') }
}

function mint() {
  mkdirSync(join(OUT, 'credentials'), { recursive: true })
  writeFileSync(join(OUT, 'registry.json'), JSON.stringify(registry, null, 2))
  const files = []
  for (const a of applicants) {
    const C = subjectCommitment(a)
    const creds = [
      issue(incomeIssuer, 'income', C, a.id, { monthlyIncome: a.monthlyIncome }),
      issue(refIssuer, 'reference', C, a.id, { monthsRented: a.monthsRented, lateCount: a.lateCount, depositReturned: a.depositReturned }),
    ]
    for (const c of creds) {
      const f = join('credentials', `${c.credentialId}.json`)
      writeFileSync(join(OUT, f), JSON.stringify(c, null, 2))
      files.push(f)
    }
  }
  return files
}

// --- self-check: reload from disk and verify everything ---------------------
// The demo listing (app/src/data.js): rent 2200, ratio 3.
const RENT = 2200, RATIO = 3

function selfCheck() {
  const reg = JSON.parse(readFileSync(join(OUT, 'registry.json')))
  const byKey = new Map(reg.issuers.map((i) => [i.publicKey, i]))
  const dir = join(OUT, 'credentials')
  const creds = readdirSync(dir).map((f) => JSON.parse(readFileSync(join(dir, f))))
  const bySet = new Map()
  let pass = 0
  const fail = (m) => { throw new Error(m) }

  for (const c of creds) {
    const { signature, ...fields } = c
    const reg = byKey.get(c.issuerPublicKey)
    reg || fail(`${c.credentialId}: issuer key not on registry`)
    reg.type === c.type || fail(`${c.credentialId}: issuer type ${reg.type} != credential type ${c.type}`)
    const pub = createPublicKey({ key: Buffer.concat([Buffer.from('302a300506032b6570032100', 'hex'), Buffer.from(c.issuerPublicKey, 'hex')]), format: 'der', type: 'spki' })
    verify(null, credDigest(fields), pub, Buffer.from(signature, 'hex')) || fail(`${c.credentialId}: bad signature`)
    c.expiresAt > DEMO_NOW || fail(`${c.credentialId}: expired`)
    if (c.type === 'income') c.claims.monthlyIncome >= RATIO * RENT || fail(`${c.credentialId}: income below ${RATIO}x rent`)
    else {
      c.claims.monthsRented >= 12 || fail(`${c.credentialId}: under 12 months`)
      c.claims.lateCount <= 2 || fail(`${c.credentialId}: over 2 late`)
      c.claims.depositReturned === true || fail(`${c.credentialId}: deposit not returned`)
    }
    const set = bySet.get(c.subjectCommitment) || {}
    set[c.type] = c.credentialId
    bySet.set(c.subjectCommitment, set)
    pass++
  }

  bySet.size === applicants.length || fail(`expected ${applicants.length} sets, got ${bySet.size}`)
  for (const [C, set] of bySet) {
    (set.income && set.reference) || fail(`set ${C.slice(0, 8)}: missing income or reference`)
  }
  return { pass, sets: bySet.size }
}

const files = mint()
const { pass, sets } = selfCheck()
console.log(`registry.json: ${registry.issuers.length} approved issuers`)
for (const f of files) console.log(`  ${f}`)
console.log(`PASS: ${pass} credentials verified across ${sets} demo sets (signatures, registry, expiry, badges, C-binding).`)
