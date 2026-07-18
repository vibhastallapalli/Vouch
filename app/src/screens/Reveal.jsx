import Button from '../ds/Button.jsx'
import Seal from '../ds/Seal.jsx'
import SequenceNav from '../ds/SequenceNav.jsx'
import Status from '../ds/Status.jsx'
import LedgerSplit from '../ds/LedgerSplit.jsx'
import { LISTING, REVEAL_TX } from '../data.js'

const fmtMoney = (n) => n.toLocaleString('en-US')

export default function Reveal({ persona, revealed, ring, onReveal, onRegister }) {
  const p = persona
  return (
    <>
      <div style={{ padding: '28px 40px 0' }}><SequenceNav steps={['Prove', 'Apply', 'Reveal']} current={2} /></div>
      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 24, maxWidth: 940, padding: '24px 40px 48px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 18 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 36, lineHeight: 1.1, margin: 0 }}>Reveal and pay</h2>
          <span style={{ font: '400 12px/1 var(--font-mono)', color: 'var(--muted)' }}>ENTRY NO. {p.entryNo}</span>
        </div>
        {!revealed ? (
          <>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: 'var(--ink-2)', maxWidth: '44em' }}>
              The landlord committed to your entry. The commit marks you; it cannot unmask you. Opening your identity and paying the {fmtMoney(LISTING.deposit)} deposit happen together, in one transaction, and only you can send it.
            </p>
            <Button size="lg" onClick={onReveal}>Open identity and pay deposit</Button>
          </>
        ) : (
          <>
            <LedgerSplit
              publicRows={[
                { label: 'Reveal status', value: <Status kind="recorded">Revealed</Status> },
                { label: 'Identity', value: p.identity },
                { label: 'Commitment opened', value: p.commitment, mono: true },
                { label: 'Deposit', value: fmtMoney(LISTING.deposit) + ' into escrow', mono: true },
                { label: 'Transaction', value: REVEAL_TX, mono: true },
              ]}
              privateRows={[
                { label: 'Income figure', value: 'Never shown on chain, even now' },
                { label: 'Tenancy history', value: 'Never shown on chain, even now' },
                { label: 'The other applicants', value: 'Still ghosts, forever' },
              ]}
              publicNote="One transaction: the identity opens and the deposit moves, atomically."
              privateNote="Winning reveals who you are, never your numbers. Losing reveals nothing at all."
              seal={<Seal mode="stamped" size={140} ring={ring} center="REVEALED" />}
            />
            <div style={{ display: 'flex', gap: 12 }}>
              <Button variant="ghost" onClick={onRegister}>See the register</Button>
            </div>
          </>
        )}
      </main>
    </>
  )
}
