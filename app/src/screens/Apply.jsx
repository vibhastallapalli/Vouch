import { useState } from 'react'
import Button from '../ds/Button.jsx'
import SequenceNav from '../ds/SequenceNav.jsx'
import { PERSONAS, LISTING, HARD_BADGES, SOFT_FIELDS } from '../data.js'

const mono = { font: '400 13px/1.5 var(--font-mono)' }

const LockIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'block', flex: 'none' }}>
    <rect x="4" y="10.5" width="16" height="10" rx="1.5" />
    <path d="M7.5 10.5V7a4.5 4.5 0 0 1 9 0v3.5" strokeLinecap="round" />
  </svg>
)

const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flex: 'none' }}>
    <path d="M5 13l4 4L19 7" />
  </svg>
)

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

export default function Apply({ persona, soft, onSoftChange, applied, error, onGenerate, onOpenReceipt }) {
  const p = persona
  const inc = p.credentials.income
  const ref = p.credentials.reference
  const [landlordVerified, setLandlordVerified] = useState(false)

  const step = (f, d) =>
    onSoftChange((s) => ({ ...s, [f.key]: Math.min(f.max, Math.max(f.min, s[f.key] + d * f.step)) }))

  return (
    <>
      <div style={{ padding: '28px 40px 0' }}><SequenceNav steps={['Prove', 'Apply', 'Reveal']} current={0} /></div>
      <main style={{ display: 'grid', gridTemplateColumns: '1.2fr .8fr', gap: 40, alignItems: 'start', maxWidth: 980, padding: '32px 40px 48px' }}>
        <section style={{ background: 'var(--ledger)', padding: 28, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <span className="mn-label" style={{ color: 'rgba(244,239,228,.7)' }}>Private · stays on this device</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 32, lineHeight: 1.15, margin: 0, color: '#F4EFE4' }}>Your credential wallet</h1>
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
          {/* MOCK: previous-landlord reference. Clicking "attach" stands in for a bill the
              landlord sent; the app takes their word and grants a permanent verified badge.
              No document is read or checked — a real issuer signature would replace this.
              Labeled in the README limitations section. */}
          <div style={{ border: '1px solid ' + (landlordVerified ? 'var(--vbadge-line)' : 'rgba(244,239,228,.35)'), padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'baseline' }}>
              <span style={{ font: '600 12px/1 var(--font-mono)', letterSpacing: '.1em', color: '#F4EFE4' }}>PREVIOUS LANDLORD REFERENCE</span>
              <span style={{ font: '600 10px/1 var(--font-mono)', letterSpacing: '.08em', color: landlordVerified ? 'var(--vbadge-ink)' : 'rgba(244,239,228,.55)' }}>
                {landlordVerified ? 'VERIFIED' : 'NOT VERIFIED'}
              </span>
            </div>
            {landlordVerified ? (
              <p style={{ margin: 0, ...mono, color: 'rgba(244,239,228,.85)' }}>
                Bill accepted. Marcus Bell vouched for you — a permanent LANDLORD VERIFIED badge now rides with your entry.
              </p>
            ) : (
              <>
                <p style={{ margin: 0, ...mono, color: 'rgba(244,239,228,.7)' }}>
                  Send a bill or letter your last landlord gave you. We take their word for it and grant a permanent badge.
                </p>
                <span style={{ alignSelf: 'flex-start' }}>
                  <Button variant="paper" onClick={() => setLandlordVerified(true)}>Attach the bill they sent</Button>
                </span>
              </>
            )}
          </div>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: 'rgba(244,239,228,.7)' }}>
            Held in memory on this device. Applying sends a proof about these numbers, never the numbers.
          </p>
        </section>
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start', paddingTop: 4 }}>
          <span className="mn-label" style={{ color: 'var(--seal)' }}>What leaves this device</span>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: 'var(--ink-2)' }}>
            Badge bits proving every requirement of {LISTING.id}, your identity commitment, and a one-per-listing nullifier. Nothing else.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
            <span className="mn-label" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--muted)' }}>
              <LockIcon /> Proven, locked — you can't edit these
            </span>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {HARD_BADGES.map((b) => <span key={b.key} className="nd-badge" title={b.rule} aria-label={b.label + ': ' + b.rule}>{b.label}</span>)}
              {landlordVerified && (
                <span className="nd-badge nd-badge--verified" title="Verified from a bill your previous landlord sent" aria-label="Landlord verified: Verified from a bill your previous landlord sent">
                  <CheckIcon /> LANDLORD VERIFIED
                </span>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
            <span className="mn-label" style={{ color: 'var(--muted)' }}>Yours to set — self-claimed, unproven</span>
            {SOFT_FIELDS.map((f) => (
              <div key={f.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                <span style={{ font: '600 11px/1 var(--font-mono)', letterSpacing: '.08em', color: 'var(--ink-2)' }}>{f.label}</span>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <button type="button" className="nd-stepbtn" aria-label={'decrease ' + f.label} disabled={soft[f.key] <= f.min} onClick={() => step(f, -1)}>−</button>
                  <span style={{ minWidth: 58, textAlign: 'center', font: '600 12px/1 var(--font-mono)', color: 'var(--ink)' }}>{soft[f.key]}{f.unit ? ' ' + f.unit : ''}</span>
                  <button type="button" className="nd-stepbtn" aria-label={'increase ' + f.label} disabled={soft[f.key] >= f.max} onClick={() => step(f, 1)}>+</button>
                </div>
              </div>
            ))}
            <span style={{ font: '400 11px/1.4 var(--font-mono)', color: 'var(--muted)' }}>Set these to whatever's true for you. Nobody proves them, so nothing here is checked.</span>
          </div>

          <div style={{ ...mono, color: 'var(--ink-2)' }}>
            <span style={{ display: 'block' }}>COMMITMENT {p.commitment}</span>
            <span style={{ display: 'block' }}>NULLIFIER {p.nullifier}</span>
          </div>
          {error && <p role="alert" style={{ margin: 0, fontSize: 14, color: 'var(--seal)' }}>{error}</p>}
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
