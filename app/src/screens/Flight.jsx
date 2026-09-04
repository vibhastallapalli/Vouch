import Seal from '../ds/Seal.jsx'
import SequenceNav from '../ds/SequenceNav.jsx'

const STAGES = ['Reading credentials', 'Checking badge predicates', 'Generating proof', 'Posting the application']

export default function Flight({ t, proofSeconds, ring }) {
  const stage = Math.min(3, Math.floor(t / (proofSeconds / 4)))
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 24, maxWidth: 900, padding: '28px 40px 0' }}>
        <SequenceNav steps={['Prove', 'Apply', 'Reveal']} current={1} />
        <span style={{ font: '400 13px/1 var(--font-mono)', color: 'var(--muted)' }}>{t.toFixed(1)}s</span>
      </div>
      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, maxWidth: 900, padding: '36px 40px 56px' }}>
        <div className="nd-sealwrap"><Seal mode="drawing" size={230} ring={ring} center="IN PROGRESS" duration={proofSeconds} /></div>
        <ol aria-live="polite" aria-label="Proof generation progress" style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8, minWidth: 340 }}>
          {STAGES.map((txt, i) => (
            <li key={txt} style={{ display: 'flex', gap: 12, alignItems: 'baseline', fontSize: 15, color: i <= stage ? 'var(--ink)' : 'var(--muted)' }}>
              <span style={{ font: '600 12px/1.4 var(--font-mono)', color: i <= stage ? 'var(--seal)' : 'var(--muted)' }}>{'0' + (i + 1)}</span>
              <span>{txt + (i < stage ? ' · done' : i === stage ? ' …' : '')}</span>
            </li>
          ))}
        </ol>
        <p style={{ margin: 0, fontSize: 14, color: 'var(--muted)', maxWidth: '36em', textAlign: 'center' }}>
          Proof generation takes a few seconds by design. Nothing about your income, history, or identity is being sent.
        </p>
      </main>
    </>
  )
}
