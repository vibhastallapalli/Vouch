import Button from '../ds/Button.jsx'
import Seal from '../ds/Seal.jsx'
import SequenceNav from '../ds/SequenceNav.jsx'
import Status from '../ds/Status.jsx'
import LedgerSplit from '../ds/LedgerSplit.jsx'
import { APPLY_TX, HARD_BADGES } from '../data.js'

export default function Applied({ persona, ring, onPool, onRegister }) {
  const p = persona
  const inc = p.credentials.income
  const ref = p.credentials.reference
  return (
    <>
      <div style={{ padding: '28px 40px 0' }}><SequenceNav steps={['Prove', 'Apply', 'Reveal']} current={1} /></div>
      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 24, maxWidth: 940, padding: '24px 40px 48px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 18 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 36, lineHeight: 1.1, margin: 0 }}>You are in the pool</h1>
          <span style={{ font: '400 12px/1 var(--font-mono)', color: 'var(--muted)' }}>ENTRY NO. {p.entryNo}</span>
        </div>
        <LedgerSplit
          publicRows={[
            { label: 'Entry status', value: <Status kind="recorded">In pool</Status> },
            { label: 'Badges proved', value: HARD_BADGES.map((b) => b.label).join(' · '), mono: true },
            { label: 'Commitment', value: p.commitment, mono: true },
            { label: 'Nullifier', value: p.nullifier, mono: true },
            { label: 'Transaction', value: APPLY_TX, mono: true },
          ]}
          privateRows={[
            { label: 'Monthly income', value: inc.monthlyIncome.toLocaleString('en-US') + ' · never left this device' },
            { label: 'Tenancy history', value: ref.monthsRented + ' months, ' + ref.lateCount + ' late · never left' },
            { label: 'Identity', value: 'Sealed until you are the one chosen' },
          ]}
          publicNote="The pool sees a qualified ghost: badges, a commitment, a nullifier."
          privateNote="Kept by you. The chain never saw it."
          seal={<Seal mode="stamped" size={140} ring={ring} center="IN POOL" />}
        />
        <div style={{ display: 'flex', gap: 12 }}>
          <Button variant="secondary" onClick={onPool}>Review the pool</Button>
          <Button variant="ghost" onClick={onRegister}>See the register</Button>
        </div>
      </main>
    </>
  )
}
