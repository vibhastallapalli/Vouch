# interface.md (v7, locked)

Private applicant pools for rentals. Many apply, all prove they qualify, only
the winner is revealed. This file is the contract's authority: the contract
contains the circuits in section 8 and nothing else.

## 1. Actors

- Applicant: holds an identity secret, collects credentials from issuers,
  joins listing pools anonymously, reveals only after being committed to.
- Landlord: creates a listing, posts a listing bond, filters the anonymous
  pool by badges, commits to one applicant.
- Issuers (MOCKED, label in code and README): two types, the income issuer
  (payroll or bank platform) and the rental reference issuer (rent payment
  platform holding the payment records). Finite set, keys on an approved
  issuer registry.

## 2. Identity commitment

Each applicant holds, in local wallet state, never on chain:

- `s`, identity secret (32 random bytes, generated once). Never disclosed,
  not even at reveal.
- `r`, commitment blinding factor (32 fresh random bytes).

Identity fields (private): `nameHash`, `dobHash`, `contactHash`.

Derivations:

```
pk = persistentHash("rentpool:pk", s)
C  = persistentCommit(IdentityFields { nameHash, dobHash, contactHash, pk }, r)
```

C binds `pk`, not `s`, under separate blinding `r`. Nullifiers derive from
`s` (section 5), so if reveal disclosed `s`, anyone could recompute this
applicant's nullifier for every other listing and deanonymize their other
applications. With `pk` bound instead, opening C at reveal exposes only the
identity fields, `pk`, and `r`. Applications on other listings stay
unlinkable even after a reveal.

The identity commitment binding circuit proves knowledge of `s`, `r`, and
the identity fields such that `pk = H(s)` and C opens as above, tying
nullifiers and reveals to the same hidden person, unforgeable against
someone else's C.

Reveal = disclose the identity field preimages plus `r` (never `s`); the
contract recomputes C and checks it against the entry the landlord
committed to.

## 3. Credential JSON shape (issued off-chain by mock issuers)

```json
{
  "credentialId": "uuid",
  "issuer": "mock-rentflow-platform",
  "issuerPublicKey": "hex, must be on the approved issuer registry",
  "subjectCommitment": "hex (C, never the applicant's name)",
  "type": "income | reference",
  "claims": {
    "monthlyIncome": 0,
    "monthsRented": 0,
    "lateCount": 0,
    "depositReturned": true
  },
  "issuedAt": 1752710400,
  "expiresAt": 1784246400,
  "signature": "hex, issuer signature over H(canonical serialization of all fields above)"
}
```

- Credentials bind to C, never to plaintext identity. Verifying a credential
  never deanonymizes the applicant.
- `claims` carries only the fields for its type: income credentials carry
  `monthlyIncome`; reference credentials carry `monthsRented`, `lateCount`,
  `depositReturned`.
- `expiresAt` is a Unix timestamp, checked in circuit. Stale income does
  not pass.
- Issuer authorization is the registry check (section 8): the credential's
  signing key must be on the approved issuer list, verified in circuit for
  both issuer types. Build note: implement signature verification with the
  stdlib elliptic curve operations (Schnorr over Jubjub); if the cost blows
  the circuit budget, fall back to a registry of issuer-submitted credential
  hashes (same membership circuit, weaker story, must be labeled in README).

## 4. Domain separation

Every hash or commit use gets a distinct ASCII domain tag, padded to fixed
length:

- `"rentpool:pk"`   identity public key from secret
- `"rentpool:idc"`  identity commitment
- `"rentpool:null"` per-listing nullifier
- `"rentpool:cred"` credential canonical hash

## 5. Per-listing nullifier

```
N = persistentHash("rentpool:null", s, listingId)
```

- `listingId` is public and unique per listing, assigned at creation.
- One entry per (applicant, listing): the contract rejects a repeated N.
- Entries for different listings are unlinkable because N depends on
  `listingId` under the hash, and `s` never leaves the applicant's device.

## 6. Hard badges (proven, all or nothing)

| Badge            | Claim source         | Predicate                                     |
|------------------|----------------------|-----------------------------------------------|
| income ratio     | income credential    | monthlyIncome >= k * monthlyRent, k public listing data |
| months rented    | reference credential | monthsRented >= N months                      |
| late count       | reference credential | lateCount <= K                                |
| deposit returned | reference credential | depositReturned == true                       |

Qualification is all or nothing: the contract only accepts an application
that satisfies EVERY hard badge the listing requires. No partial passes,
because the pattern of which checks passed could itself fingerprint someone.
Every accepted pool entry is qualified by construction.

## 7. Soft preferences (self-claimed, plaintext, never proven)

`moveInDate`, `leaseLengthMonths`, `pets`, `occupants`. Plaintext fields on
the pool entry, about four generic ones. Lying about them hurts nobody, so
they need no proof. UI must visually distinguish soft preferences from
proven badges. These never touch the contract circuits; renaming or adding
one is a UI and data change only.

## 8. Circuit list (verbatim scope, the contract contains these and nothing else)

- Income threshold: prove income is at least ratio times rent, without
  revealing income.
- Three reference predicates, max: rented at least N months, never more
  than K late, deposit returned in full.
- Registry check: the signing key is on the approved issuer list, for the
  two issuer types.
- Identity commitment binding: every credential opens the same locked
  identity token C.
- Per-listing nullifier: one application per identity per listing,
  unlinkable across listings.
- Commit, reveal, deposit: landlord commits to one, that applicant opens C
  and pays the deposit into escrow, release on confirm, refund if dead.

Bounds: 4 to 9 circuits, 150 to 300 lines. Credential expiry is checked in
circuit wherever a credential is consumed.

Explicitly out of scope forever (README only, never code): guarantor OR
branch, listing bond drawdown automation, timeout repick, joint applicants.

## 9. Commit / reveal / deposit flow

1. Landlord filters the anonymous pool (uniform hard badges by
   construction, soft preferences vary) and commits on chain to one entry
   by its C. The commit MARKS the winner; the contract cannot decrypt
   anyone.
2. The committed applicant submits one transaction that opens C (identity
   field preimages plus `r`, never `s`) and pays the deposit into escrow.
3. Release: deposit released on confirm.
4. Refund: deposit returns if the deal is dead.

Once deposit, reveal, release, refund work, they are frozen.

## 10. Public vs private (seed for the README table)

| On chain, public                          | Private, never on chain          |
|-------------------------------------------|----------------------------------|
| listing data (rent, ratio k, thresholds)  | income figure                    |
| identity commitment C per pool entry      | identity fields behind C         |
| nullifier N per entry                     | identity secret `s`              |
| soft preference plaintext                 | rental history numbers           |
| landlord commit mark                      | which credentials back an entry  |
| revealed winner's identity fields + `r`   | losers' everything               |

## 11. Mocked components (label in code and README)

- Both issuer types: keys generated locally, signatures real, institutions
  fake.
- The approved issuer registry: seeded by us, not a live authority.
- Proof server: local dev proof server.
