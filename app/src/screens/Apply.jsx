import Button from '../ds/Button.jsx'
import SequenceNav from '../ds/SequenceNav.jsx'
import { PERSONAS, LISTING, HARD_BADGES } from '../data.js'

const mono = { font: '400 13px/1.5 var(--font-mono)' }

function CredentialCard({ title, issuer, rows }) {
  return (
    <div style={{ border: '1px solid rgba(244,239,228,.35)', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'baseline' }}>
        <span style={{ font: '600 12px/1 var(--font-mono)', letterSpacing: '.1em', color: '#F4EFE4' }}>{title}</span>
        <span style={{ font: '400 10px/1 var(--font-mono)', letterSpacing: '.08em', color: 'rgba(244,239,228,.6)' }}>{issuer.toUpperCase()} · MOCK ISSUER</span>
      </div>
      {rows.map(([k, v]) => (
        <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, ...mono, color: 'rgba(244,239,228,.85)' }}>
          <span>{k}</span><span>{v}</span>
        </div>
      ))}
    </div>
  )
}

export default function Apply({ persona, applied, error, onGenerate, onOpenReceipt }) {
  const p = persona
  const inc = p.credentials.income
  const ref = p.credentials.reference
  return (
    <>
      <div style={{ padding: '28px 40px 0' }}><SequenceNav steps={['Prove', 'Apply', 'Reveal']} current={0} /></div>
      <main style={{ display: 'grid', gridTemplateColumns: '1.2fr .8fr', gap: 40, alignItems: 'start', maxWidth: 980, padding: '32px 40px 48px' }}>
        <section style={{ background: 'var(--ledger)', padding: 28, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <span className="mn-label" style={{ color: 'rgba(244,239,228,.7)' }}>Private · stays on this device</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 32, lineHeight: 1.15, margin: 0, color: '#F4EFE4' }}>Your credential wallet</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {PERSONAS.map((x) => (
              <span key={x.id} style={{ font: '600 10px/1 var(--font-mono)', letterSpacing: '.1em', padding: '5px 8px', border: '1px solid rgba(244,239,228,.4)', borderRadius: 2, color: x.id === p.id ? 'var(--ledger)' : 'rgba(244,239,228,.75)', background: x.id === p.id ? '#F4EFE4' : 'transparent' }}>
                {x.id === p.id ? 'DEMO APPLICANT ' + x.id : 'APPLICANT ' + x.id + ' · IN POOL'}
              </span>
            ))}
          </div>
          <CredentialCard
            title="INCOME CREDENTIAL"
            issuer={inc.issuer}
            rows={[
              ['Monthly income', inc.monthlyIncome.toLocaleString('en-US')],
              ['Expires', inc.expires],
            ]}
          />
          <CredentialCard
            title="REFERENCE CREDENTIAL"
            issuer={ref.issuer}
            rows={[
              ['Months rented', String(ref.monthsRented)],
              ['Late payments', String(ref.lateCount)],
              ['Deposit returned', ref.depositReturned ? 'In full' : 'No'],
            ]}
          />
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: 'rgba(244,239,228,.7)' }}>
            Held in memory on this device. Applying sends a proof about these numbers, never the numbers.
          </p>
        </section>
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start', paddingTop: 4 }}>
          <span className="mn-label" style={{ color: 'var(--seal)' }}>What leaves this device</span>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: 'var(--ink-2)' }}>
            Badge bits proving every requirement of {LISTING.id}, your identity commitment, and a one-per-listing nullifier. Nothing else.
          </p>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {HARD_BADGES.map((b) => <span key={b.key} className="nd-badge">{b.label}</span>)}
          </div>
          <div style={{ ...mono, color: 'var(--ink-2)' }}>
            <span style={{ display: 'block' }}>COMMITMENT {p.commitment}</span>
            <span style={{ display: 'block' }}>NULLIFIER {p.nullifier}</span>
          </div>
          <span className="mn-label">Soft preferences · self-claimed, unproven</span>
          <p style={{ margin: 0, ...mono, color: 'var(--ink-2)' }}>
            Move-in {p.soft.moveIn} · {p.soft.leaseMonths}-month lease · Pets: {p.soft.pets} · {p.soft.occupants} occupant{p.soft.occupants > 1 ? 's' : ''}
          </p>
          {error && <p style={{ margin: 0, fontSize: 14, color: 'var(--seal)' }}>{error}</p>}
          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            {applied
              ? <Button variant="secondary" onClick={onOpenReceipt}>See your application</Button>
              : <Button onClick={onGenerate}>Generate proof and apply</Button>}
          </div>
          {applied && (
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: 'var(--muted)' }}>
              Application recorded. The per-listing nullifier allows one entry per identity, so applying again would be rejected.
            </p>
          )}
        </aside>
      </main>
    </>
  )
}
