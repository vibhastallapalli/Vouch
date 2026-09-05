import Button from '../ds/Button.jsx'
import Seal from '../ds/Seal.jsx'
import SequenceNav from '../ds/SequenceNav.jsx'
import EventLog from '../EventLog.jsx'
import { APP_NAME, LISTING, HARD_BADGES } from '../data.js'

const fmtMoney = (n) => n.toLocaleString('en-US')

export default function Desk({ ring, poolCount, proofCount, proofSeconds, events, landingError, onApply, onPool, onRegister }) {
  return (
    <>
      <main style={{ display: 'grid', gridTemplateColumns: '1.15fr .85fr', gap: 40, alignItems: 'center', padding: '44px 40px 8px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22, alignItems: 'flex-start' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 56, lineHeight: 1.05, letterSpacing: '-.01em', margin: 0 }}>{APP_NAME}</h1>
          <p style={{ fontSize: 18, lineHeight: 1.5, color: 'var(--ink-2)', maxWidth: '34em', margin: 0 }}>
            Prove you qualify for the apartment. Stay a ghost until you are the one chosen.
          </p>
          <SequenceNav steps={['Prove', 'Apply', 'Reveal']} current={-1} />
          {landingError && <p role="alert" style={{ margin: 0, fontSize: 14, color: 'var(--seal)' }}>{landingError}</p>}
          <span style={{ marginTop: 6 }}>
            <Button size="lg" onClick={onApply}>Enter the pool</Button>
          </span>
        </div>
        <div className="nd-sealwrap" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', flexWrap: 'wrap', gap: '8px 24px' }}>
          <Seal mode="embossed" size={240} ring={ring} center="UNSTAMPED" />
          <span title="Coffee by night, tea by day" style={{ color: 'var(--ink-2)', display: 'block', flex: 'none' }}>
            <svg role="img" aria-label="Coffee steams by night, tea by day" width="94" height="100" viewBox="0 0 94 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <g stroke="var(--steam)" strokeWidth="2">
                <path className="nd-steam" d="M31 34c-3.5-5 3.5-8 0-15" />
                <path className="nd-steam-b" d="M43 36c-3.5-6 3.5-10 0-18" />
                <g style={{ opacity: 'var(--night)' }}><path className="nd-steam-c" d="M55 34c-3.5-5 3.5-8 0-15" /></g>
              </g>
              <ellipse cx="43" cy="46" rx="19.5" ry="3.4" fill="var(--coffee)" stroke="none" />
              <path d="M19 46h48v9c0 13-10 21-24 21s-24-8-24-21z" />
              <path d="M67 50h3.5a9.5 9.5 0 0 1 0 19h-5.5" />
              <g style={{ opacity: 'var(--day)' }}>
                <path d="M28 45c-2 3-5.5 5-6.5 9" />
                <rect x="15.5" y="54" width="11.5" height="13.5" fill="var(--card-surface)" />
                <path d="M18.5 58.5h5.5" />
              </g>
              <path d="M82 87a5 5 0 1 0 4 8" style={{ opacity: 'var(--night)' }} stroke="var(--coffee)" />
              <path d="M12 84h62M31 90h24" />
            </svg>
          </span>
        </div>
      </main>

      <section aria-label="The listing" style={{ margin: '28px 40px 0' }}>
        <div style={{ border: '1.5px solid var(--ink)', background: 'var(--paper)', boxShadow: 'var(--doc-shadow)', padding: '22px 26px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, flexWrap: 'wrap' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 28, lineHeight: 1.15, margin: 0 }}>{LISTING.title}</h2>
            <span style={{ font: '400 11px/1 var(--font-mono)', letterSpacing: '.1em', color: 'var(--muted)' }}>{LISTING.id} · AVAILABLE {LISTING.available.toUpperCase()}</span>
          </div>
          <div style={{ display: 'flex', gap: 26, flexWrap: 'wrap', font: '400 14px/1 var(--font-mono)', color: 'var(--ink-2)' }}>
            <span>RENT {fmtMoney(LISTING.rent)}</span>
            <span>DEPOSIT {fmtMoney(LISTING.deposit)}</span>
            <span>INCOME RATIO {LISTING.ratio}X</span>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <span className="mn-label" style={{ marginRight: 4 }}>Required, proven in zero knowledge</span>
            {HARD_BADGES.map((b) => <span key={b.key} className="nd-badge">{b.label}</span>)}
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <Button variant="secondary" onClick={onPool}>Review the pool</Button>
          </div>
        </div>
      </section>

      <section aria-label="Desk stats" style={{ display: 'flex', alignItems: 'baseline', margin: '28px 40px 0', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}>
        <span style={{ display: 'flex', alignItems: 'baseline', gap: 9, padding: '12px 26px 12px 0' }}>
          <span style={{ font: '400 17px/1 var(--font-mono)' }}>{poolCount}</span>
          <span style={{ font: '600 10px/1 var(--font-mono)', letterSpacing: '.12em', color: 'var(--muted)' }}>IN THE POOL</span>
        </span>
        <span style={{ display: 'flex', alignItems: 'baseline', gap: 9, padding: '12px 26px', borderLeft: '1px solid var(--rule)' }}>
          <span style={{ font: '400 17px/1 var(--font-mono)' }}>{proofCount}</span>
          <span style={{ font: '600 10px/1 var(--font-mono)', letterSpacing: '.12em', color: 'var(--muted)' }}>PROOFS RECORDED</span>
        </span>
        <span style={{ display: 'flex', alignItems: 'baseline', gap: 9, padding: '12px 26px', borderLeft: '1px solid var(--rule)' }}>
          <span style={{ font: '400 17px/1 var(--font-mono)' }}>{proofSeconds.toFixed(1)} S</span>
          <span style={{ font: '600 10px/1 var(--font-mono)', letterSpacing: '.12em', color: 'var(--muted)' }}>MEAN PROOF TIME</span>
        </span>
        <span style={{ display: 'flex', alignItems: 'baseline', gap: 9, padding: '12px 0 12px 26px', borderLeft: '1px solid var(--rule)' }}>
          <span style={{ font: '400 17px/1 var(--font-mono)', color: 'var(--ledger-text)' }}>0</span>
          <span style={{ font: '600 10px/1 var(--font-mono)', letterSpacing: '.12em', color: 'var(--muted)' }}>SECRETS ON CHAIN</span>
        </span>
      </section>

      <section aria-label="Register of events" style={{ padding: '20px 40px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, marginBottom: 10 }}>
          <span className="mn-label">Register for {LISTING.id}</span>
          <button className="nd-linkbtn" onClick={onRegister}>OPEN THE FULL REGISTER</button>
        </div>
        <EventLog events={events.slice(0, 4)} />
      </section>

      <section aria-label="How it works" style={{ margin: '0 40px', borderTop: '1px solid var(--rule)', padding: '22px 0 44px' }}>
        <span className="mn-label">How it works</span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 40, marginTop: 16 }}>
          {[
            ['01', 'Prove', 'Your credentials become a proof that you qualify. The numbers never leave your device.'],
            ['02', 'Apply', 'You join the pool as a ghost: badges visible, identity sealed. One entry per person per listing.'],
            ['03', 'Reveal', 'The landlord filters ghosts and commits to one. Only that person opens their identity and pays the deposit.'],
          ].map(([num, title, body]) => (
            <div key={num} style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              <span style={{ font: '600 12px/1 var(--font-mono)', color: 'var(--seal)' }}>{num}</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 21, lineHeight: 1.2, margin: 0 }}>{title}</h3>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: 'var(--ink-2)' }}>{body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
