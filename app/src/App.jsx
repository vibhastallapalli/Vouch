import { useEffect, useState } from 'react'
import Button from './ds/Button.jsx'
import WalletChip from './ds/WalletChip.jsx'
import Input from './ds/Input.jsx'
import Seal from './ds/Seal.jsx'
import SequenceNav from './ds/SequenceNav.jsx'
import Status from './ds/Status.jsx'
import LedgerSplit from './ds/LedgerSplit.jsx'
import { listWallets, connectWallet, shortAddress } from './wallet.js'

const PROOF_SECONDS = 7.5
const STAGES = ['Reading commitment', 'Building circuit', 'Generating proof', 'Posting to chain']

const SEED_ENTRIES = [
  { no: '0048', date: '14 Jul 2026', fact: 'Balance above stated threshold', kind: 'pending', tx: '', note: '', block: '' },
  { no: '0047', date: '12 Jul 2026', fact: 'Membership in contributor set', kind: 'recorded', tx: '8f3a4c…c21e', note: '', block: '1,203,114' },
  { no: '0046', date: '08 Jul 2026', fact: 'Age over eighteen', kind: 'recorded', tx: 'd90b17…44aa', note: '', block: '1,198,406' },
  { no: '0045', date: '03 Jul 2026', fact: 'Escrow account solvency', kind: 'recorded', tx: '21c8e0…9f3b', note: '', block: '1,191,882' },
  { no: '0044', date: '27 Jun 2026', fact: 'Age over eighteen', kind: 'void', tx: '77b2d4…0e6c', note: 'Reissued as no. 0046', block: '1,184,551' },
]

const fmtBlock = (n) => n.toLocaleString('en-US')

function rowView(e) {
  return {
    ...e,
    status: e.kind.toUpperCase(),
    factColor: e.kind === 'void' ? 'var(--muted)' : 'var(--ink)',
    deco: e.kind === 'void' ? 'line-through' : 'none',
    txText: e.kind === 'pending' ? '…' : e.tx,
    txColor: e.kind === 'recorded' ? 'var(--ink-2)' : 'var(--muted)',
    statusColor: e.kind === 'recorded' ? 'var(--ink)' : 'var(--muted)',
    ring: e.kind === 'recorded',
    divider: e.kind === 'pending' ? 'dashed' : 'solid',
  }
}

const tableGrid = {
  display: 'grid',
  gridTemplateColumns: '56px 104px 1fr 168px 132px',
  gap: 16,
}

function RegisterTable({ entries, onOpen }) {
  return (
    <div style={{ position: 'relative' }}>
      <span aria-hidden="true" style={{ position: 'absolute', left: 63, top: 0, bottom: 0, width: 1, background: 'var(--seal)', opacity: .35, pointerEvents: 'none' }} />
      <div style={{ ...tableGrid, padding: '0 12px 8px 0', borderBottom: '1.5px solid var(--ink)', font: '600 10px/1 var(--font-mono)', letterSpacing: '.12em', color: 'var(--muted)' }}>
        <span>NO.</span><span>DATE</span><span>FACT PROVED</span><span>TRANSACTION</span><span style={{ textAlign: 'right' }}>STATUS</span>
      </div>
      {entries.map(rowView).map((row) => (
        <div
          key={row.no}
          data-reg-row
          role="button"
          tabIndex={0}
          aria-label={'Open register entry ' + row.no}
          onClick={() => onOpen(row.no)}
          style={{ ...tableGrid, alignItems: 'center', padding: '11px 12px 11px 0', borderBottom: '1px ' + row.divider + ' var(--rule)' }}
        >
          <span style={{ font: '400 12px/1.4 var(--font-mono)', color: 'var(--muted)' }}>{row.no}</span>
          <span style={{ font: '400 12px/1.4 var(--font-mono)', color: 'var(--ink-2)' }}>{row.date}</span>
          <span style={{ fontSize: 15, lineHeight: 1.4 }}>
            <span style={{ color: row.factColor, textDecoration: row.deco }}>{row.fact}</span>
            {row.note && <span style={{ display: 'block', fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{row.note}</span>}
          </span>
          <span style={{ font: '400 12px/1.4 var(--font-mono)', color: row.txColor }}>{row.txText}</span>
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 7 }}>
            {row.ring && <span aria-hidden="true" style={{ width: 9, height: 9, borderRadius: '50%', border: '1.5px solid var(--seal)', flex: 'none' }} />}
            <span style={{ font: '600 11px/1 var(--font-mono)', letterSpacing: '.1em', color: row.statusColor }}>{row.status}</span>
          </span>
        </div>
      ))}
    </div>
  )
}

export default function App() {
  const [screen, setScreen] = useState('landing')
  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem('nd-mode')
    return saved === 'day' || saved === 'night' ? saved : 'night'
  })
  const [wallet, setWallet] = useState(null)
  const [connecting, setConnecting] = useState(false)
  const [pick, setPick] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [t, setT] = useState(0)
  const [error, setError] = useState('')
  const [landingError, setLandingError] = useState('')
  const [block, setBlock] = useState(1204867)
  const [receiptNo, setReceiptNo] = useState(null)
  const [verdict, setVerdict] = useState(null)
  const [entries, setEntries] = useState(SEED_ENTRIES)
  const [secret, setSecret] = useState('')
  const [verifyQ, setVerifyQ] = useState('')

  useEffect(() => {
    const i = setInterval(() => setBlock((b) => b + 1), 6000)
    return () => clearInterval(i)
  }, [])

  useEffect(() => {
    if (screen !== 'flight') return
    const i = setInterval(() => setT((x) => Math.round((x + 0.1) * 10) / 10), 100)
    return () => clearInterval(i)
  }, [screen])

  useEffect(() => {
    if (screen === 'flight' && t >= PROOF_SECONDS + 0.1) {
      setEntries((es) => es.map((e) => (e.no === '0049' ? { ...e, kind: 'recorded', tx: '4b21e7…8d3f', block: fmtBlock(block) } : e)))
      setReceiptNo('0049')
      setScreen('receipt')
    }
  }, [t, screen, block])

  const openReceipt = (no) => {
    setReceiptNo(no)
    setScreen('receipt')
  }

  const pull = (e) => {
    const next = mode === 'night' ? 'day' : 'night'
    setMode(next)
    localStorage.setItem('nd-mode', next)
    const btn = e.currentTarget
    btn.classList.remove('nd-tug')
    void btn.offsetWidth
    btn.classList.add('nd-tug')
    if (e.detail) btn.blur()
  }

  const connectTo = async (w) => {
    setPick(null)
    setConnecting(true)
    try {
      const { api, address } = await connectWallet(w)
      setWallet({ api, address: shortAddress(address) })
      setLandingError('')
    } catch (err) {
      setLandingError(err.message)
    } finally {
      setConnecting(false)
    }
  }

  const toggleWallet = () => {
    if (connecting) return
    if (wallet) { setWallet(null); setPick(null); return }
    if (pick) { setPick(null); return }
    const found = listWallets()
    // MOCK: with no wallet extension installed, connect falls back to a local UI toggle
    // with a placeholder address so the flow still runs. Labeled in the README.
    if (found.length === 0) { setWallet({ mock: true, address: 'addr1···x7q9' }); setLandingError(''); return }
    if (found.length === 1) { connectTo(found[0]); return }
    setPick(found)
  }

  const connected = !!wallet

  const navDesk = () => { setScreen('landing'); setError(''); setLandingError('') }
  const navRegister = () => setScreen('register')
  const navVerify = () => { setScreen('verify'); setVerdict(null); setVerifyQ('') }

  const goCommit = () => {
    if (!connected) {
      setLandingError('Connect your wallet first. Your address is public; your secret is not.')
      return
    }
    setSecret('')
    setError('')
    setLandingError('')
    setScreen('commit')
  }

  const commit = () => {
    if (secret.trim().length === 0) {
      setError('Enter a secret value first. It stays on this device.')
      return
    }
    setError('')
    const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    setEntries((es) => [
      { no: '0049', date: today, fact: 'Question title', kind: 'pending', tx: '', note: '', block: '' },
      ...es.filter((x) => x.no !== '0049'),
    ])
    setT(0)
    setScreen('flight')
  }

  const restart = () => { setScreen('landing'); setError(''); setT(0) }

  const verify = () => {
    const q = verifyQ.trim()
    if (!q) {
      setVerdict({ kind: null, text: 'Enter a transaction id or entry number first.' })
      return
    }
    const qq = q.toLowerCase().replace('…', '')
    const hit = entries.find((x) => x.no === q || (x.tx && x.tx.toLowerCase().replace('…', '').startsWith(qq.slice(0, 6))))
    if (!hit) {
      setVerdict({ kind: null, text: 'No proof found under that id. Check the transaction reference against the register.' })
      return
    }
    const texts = {
      recorded: 'This proof is on chain under entry no. ' + hit.no + '. It reveals only that the claim is true.',
      pending: 'Entry no. ' + hit.no + ' is awaiting inclusion. Check again in a few seconds.',
      void: 'Entry no. ' + hit.no + ' was voided. ' + (hit.note || 'Ask the holder for the current entry.'),
    }
    setVerdict({ kind: hit.kind, text: texts[hit.kind] })
  }

  const receiptEntry = entries.find((x) => x.no === receiptNo) || entries[0]
  const stage = Math.min(3, Math.floor(t / (PROOF_SECONDS / 4)))
  const onDeskFlow = ['landing', 'commit', 'flight', 'receipt'].includes(screen)
  const navStyle = (active) => ({ color: active ? 'var(--ink)' : 'var(--muted)', borderBottom: '1.5px solid ' + (active ? 'var(--seal)' : 'transparent') })

  return (
    <div data-card data-mode={mode} style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--card-surface)', color: 'var(--ink)', fontFamily: 'var(--font-body)', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', right: -96, top: -64, width: 520, height: 520, pointerEvents: 'none', opacity: 'var(--pool)', background: 'radial-gradient(closest-side,rgba(255,190,116,.22),rgba(255,190,116,.10) 42%,rgba(255,190,116,0) 72%)', zIndex: 1 }} />

      <header style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, padding: '16px 176px 16px 40px', borderBottom: '1.5px solid var(--ink)', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 28, minWidth: 0 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 21, lineHeight: 1, whiteSpace: 'nowrap' }}>Product name</span>
          <nav style={{ display: 'flex', gap: 20 }}>
            <button className="nd-navbtn" onClick={navDesk} style={navStyle(onDeskFlow)}>DESK</button>
            <button className="nd-navbtn" onClick={navRegister} style={navStyle(screen === 'register')}>REGISTER</button>
            <button className="nd-navbtn" onClick={navVerify} style={navStyle(screen === 'verify')}>VERIFY</button>
          </nav>
        </div>
        <span style={{ position: 'relative', display: 'block', flex: 'none' }}>
          <WalletChip connected={connected} address={wallet ? wallet.address : undefined} busy={connecting} onClick={toggleWallet} />
          {pick && (
            <div style={{ position: 'absolute', top: 'calc(100% + 6px)', right: 0, minWidth: 190, background: 'var(--paper)', border: '1.5px solid var(--ink)', zIndex: 7 }}>
              <span className="mn-label" style={{ display: 'block', padding: '10px 12px 6px', color: 'var(--muted)' }}>Choose a wallet</span>
              {pick.map((w, i) => (
                <button key={i} className="nd-walletopt" onClick={() => connectTo(w)}>
                  {w.icon && <img src={w.icon} alt="" width="16" height="16" />}
                  <span>{w.name || 'Wallet ' + (i + 1)}</span>
                </button>
              ))}
            </div>
          )}
        </span>
      </header>

      <svg aria-hidden="true" width="92" height="102" viewBox="0 0 104 116" style={{ position: 'absolute', right: 48, top: 70, color: 'var(--ink-2)', zIndex: 2 }} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M32 110h48M44 110v-5h26v5" />
        <path d="M58 105V50" />
        <circle cx="58" cy="48" r="2.5" />
        <path d="M58 48L38 30" />
        <path d="M16 38L44 12L58 26L30 52Z" />
        <circle cx="30" cy="44" r="4.5" fill="#FFC878" stroke="none" opacity="var(--pool)" />
      </svg>

      <button className="nd-chain" onClick={pull} aria-label="Pull the lamp chain to switch between day and night">
        <span className="nd-chain-line" />
        <span style={{ display: 'block', width: 7, height: 7, borderRadius: '50%', background: '#A8895A' }} />
        <span style={{ position: 'absolute', top: 'calc(100% + 4px)', left: '50%', transform: 'translateX(-50%)', font: '600 9px/1 var(--font-mono)', letterSpacing: '.14em', color: 'var(--muted)', whiteSpace: 'nowrap', pointerEvents: 'none' }}>
          PULL {'·'} {mode === 'night' ? 'DAY' : 'NIGHT'}
        </span>
      </button>

      <div style={{ flex: 1, overflow: 'auto', position: 'relative' }}>
        {screen === 'landing' && (
          <>
            <main style={{ display: 'grid', gridTemplateColumns: '1.15fr .85fr', gap: 40, alignItems: 'center', padding: '44px 40px 8px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 22, alignItems: 'flex-start' }}>
                <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 56, lineHeight: 1.05, letterSpacing: '-.01em', margin: 0 }}>Product name</h1>
                <p style={{ fontSize: 18, lineHeight: 1.5, color: 'var(--ink-2)', maxWidth: '34em', margin: 0 }}>One sentence stating what this app proves without revealing the secret behind it.</p>
                <SequenceNav current={-1} />
                {landingError && <p style={{ margin: 0, fontSize: 14, color: 'var(--seal)' }}>{landingError}</p>}
                <span style={{ marginTop: 6 }}>
                  <Button size="lg" onClick={goCommit}>Commit your secret</Button>
                </span>
              </div>
              <div className="nd-sealwrap" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', flexWrap: 'wrap', gap: '8px 24px' }}>
                <Seal mode="embossed" size={240} center="UNSTAMPED" />
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
            <section aria-label="Desk stats" style={{ display: 'flex', alignItems: 'baseline', margin: '28px 40px 0', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}>
              <span style={{ display: 'flex', alignItems: 'baseline', gap: 9, padding: '12px 26px 12px 0' }}>
                <span style={{ font: '400 17px/1 var(--font-mono)' }}>{entries.filter((e) => e.kind === 'recorded').length}</span>
                <span style={{ font: '600 10px/1 var(--font-mono)', letterSpacing: '.12em', color: 'var(--muted)' }}>PROOFS RECORDED</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'baseline', gap: 9, padding: '12px 26px', borderLeft: '1px solid var(--rule)' }}>
                <span style={{ font: '400 17px/1 var(--font-mono)' }}>{entries.filter((e) => e.kind === 'pending').length}</span>
                <span style={{ font: '600 10px/1 var(--font-mono)', letterSpacing: '.12em', color: 'var(--muted)' }}>PENDING</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'baseline', gap: 9, padding: '12px 26px', borderLeft: '1px solid var(--rule)' }}>
                <span style={{ font: '400 17px/1 var(--font-mono)' }}>{PROOF_SECONDS.toFixed(1)} S</span>
                <span style={{ font: '600 10px/1 var(--font-mono)', letterSpacing: '.12em', color: 'var(--muted)' }}>MEAN PROOF TIME</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'baseline', gap: 9, padding: '12px 0 12px 26px', borderLeft: '1px solid var(--rule)' }}>
                <span style={{ font: '400 17px/1 var(--font-mono)', color: 'var(--ledger-text)' }}>0</span>
                <span style={{ font: '600 10px/1 var(--font-mono)', letterSpacing: '.12em', color: 'var(--muted)' }}>SECRETS ON CHAIN</span>
              </span>
            </section>
            <section aria-label="Register of proofs" style={{ padding: '20px 40px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, marginBottom: 10 }}>
                <span className="mn-label">Register of proofs</span>
                <button className="nd-linkbtn" onClick={navRegister}>OPEN THE FULL REGISTER</button>
              </div>
              <RegisterTable entries={entries.slice(0, 4)} onOpen={openReceipt} />
            </section>
            <section aria-label="How it works" style={{ margin: '0 40px', borderTop: '1px solid var(--rule)', padding: '22px 0 44px' }}>
              <span className="mn-label">How it works</span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 40, marginTop: 16 }}>
                {[
                  ['01', 'Commit', 'Type the secret. It never leaves this window.'],
                  ['02', 'Prove', 'Your browser builds a proof that the claim is true.'],
                  ['03', 'Record', 'Only the proof is stamped into the public register.'],
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
        )}

        {screen === 'commit' && (
          <>
            <div style={{ padding: '28px 40px 0' }}><SequenceNav current={0} /></div>
            <main style={{ display: 'grid', gridTemplateColumns: '1.2fr .8fr', gap: 40, alignItems: 'start', maxWidth: 900, padding: '32px 40px 48px' }}>
              <section style={{ background: 'var(--ledger)', padding: 28, display: 'flex', flexDirection: 'column', gap: 18 }}>
                <span className="mn-label" style={{ color: 'rgba(244,239,228,.7)' }}>Private {'·'} stays on this device</span>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 32, lineHeight: 1.15, margin: 0, color: '#F4EFE4' }}>Secret input title</h2>
                <Input
                  label="Secret value"
                  privacy="private"
                  placeholder="Enter the secret thing"
                  note="Held in memory on this device. Committing does not send it anywhere."
                  value={secret}
                  onChange={(e) => setSecret(e.target.value)}
                />
              </section>
              <aside style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start', paddingTop: 4 }}>
                <span className="mn-label" style={{ color: 'var(--seal)' }}>What leaves this device</span>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: 'var(--ink-2)' }}>A commitment: a fingerprint of your secret that reveals nothing about it.</p>
                <span className="mn-label">What stays</span>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: 'var(--ink-2)' }}>The secret value itself.</p>
                {error && <p style={{ margin: 0, fontSize: 14, color: 'var(--seal)' }}>{error}</p>}
                <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                  <Button onClick={commit}>Commit</Button>
                  <Button variant="ghost" onClick={navDesk}>Back</Button>
                </div>
              </aside>
            </main>
          </>
        )}

        {screen === 'flight' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 24, maxWidth: 900, padding: '28px 40px 0' }}>
              <SequenceNav current={1} />
              <span style={{ font: '400 13px/1 var(--font-mono)', color: 'var(--muted)' }}>{t.toFixed(1)}s</span>
            </div>
            <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, maxWidth: 900, padding: '36px 40px 56px' }}>
              <div className="nd-sealwrap"><Seal mode="drawing" size={230} center="IN PROGRESS" duration={PROOF_SECONDS} /></div>
              <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8, minWidth: 340 }}>
                {STAGES.map((txt, i) => (
                  <li key={txt} style={{ display: 'flex', gap: 12, alignItems: 'baseline', fontSize: 15, color: i <= stage ? 'var(--ink)' : 'var(--muted)' }}>
                    <span style={{ font: '600 12px/1.4 var(--font-mono)', color: i <= stage ? 'var(--seal)' : 'var(--muted)' }}>{'0' + (i + 1)}</span>
                    <span>{txt + (i < stage ? ' · done' : i === stage ? ' …' : '')}</span>
                  </li>
                ))}
              </ol>
              <p style={{ margin: 0, fontSize: 14, color: 'var(--muted)', maxWidth: '36em', textAlign: 'center' }}>Proof generation takes a few seconds by design. Nothing about your secret is being sent.</p>
            </main>
          </>
        )}

        {screen === 'receipt' && (
          <>
            <div style={{ padding: '28px 40px 0' }}><SequenceNav current={2} /></div>
            <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 24, maxWidth: 940, padding: '24px 40px 48px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 18 }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 36, lineHeight: 1.1, margin: 0 }}>Receipt</h2>
                <span style={{ font: '400 12px/1 var(--font-mono)', color: 'var(--muted)' }}>ENTRY NO. {receiptNo || '0047'}</span>
              </div>
              <LedgerSplit
                publicRows={[
                  { label: 'Proof status', value: <Status kind={receiptEntry.kind} /> },
                  { label: 'Commitment', value: 'Commitment hash', mono: true },
                  { label: 'Transaction', value: receiptEntry.kind === 'pending' ? 'Awaiting inclusion …' : receiptEntry.tx, mono: true },
                  { label: 'Recorded at', value: receiptEntry.block ? 'Block ' + receiptEntry.block : 'Block reference', mono: true },
                ]}
                privateRows={[
                  { label: 'Secret value', value: 'Never shown on chain' },
                  { label: 'Question answered', value: 'Question title' },
                  { label: 'Where it lives', value: 'This device' },
                ]}
                publicNote="Anyone can verify this proof. It reveals only that the claim is true."
                privateNote="Kept by you. The chain never saw it."
                seal={<Seal mode="stamped" size={140} center={receiptEntry.kind === 'recorded' ? 'RECORDED' : receiptEntry.kind.toUpperCase()} />}
              />
              <div style={{ display: 'flex', gap: 12 }}>
                <Button variant="secondary" onClick={restart}>Start over</Button>
                <Button variant="ghost" onClick={navRegister}>See the register</Button>
              </div>
            </main>
          </>
        )}

        {screen === 'register' && (
          <main style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '36px 40px 48px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 36, lineHeight: 1.1, margin: 0 }}>Register of proofs</h2>
              <span style={{ font: '400 11px/1 var(--font-mono)', letterSpacing: '.1em', color: 'var(--muted)' }}>PUBLIC RECORD {'·'} PAGE 07 {'·'} {entries.length} ENTRIES</span>
            </div>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: 'var(--ink-2)', maxWidth: '44em' }}>Every proof this desk has posted, newest first. Each line is public: it shows that something was proved, never what the secret was.</p>
            <div style={{ marginTop: 8 }}>
              <RegisterTable entries={entries} onOpen={openReceipt} />
            </div>
          </main>
        )}

        {screen === 'verify' && (
          <main style={{ display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'flex-start', maxWidth: 640, padding: '36px 40px 48px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 36, lineHeight: 1.1, margin: 0 }}>Verify a proof</h2>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: 'var(--ink-2)' }}>Paste a transaction id or an entry number from the register. Verification reads the chain only; no wallet needed.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}>
              <label htmlFor="nd-verify-q" className="mn-label">Transaction id or entry no.</label>
              <input
                id="nd-verify-q"
                className="nd-verify-input"
                type="text"
                placeholder={'8f3a4c…c21e or 0047'}
                value={verifyQ}
                onChange={(e) => setVerifyQ(e.target.value)}
              />
            </div>
            <Button onClick={verify}>Verify</Button>
            {verdict && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start', borderTop: '1px solid var(--rule)', paddingTop: 18, width: '100%' }}>
                {verdict.kind && <Status kind={verdict.kind} />}
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: verdict.kind ? 'var(--ink-2)' : 'var(--seal)' }}>{verdict.text}</p>
              </div>
            )}
          </main>
        )}
      </div>

      <footer style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, padding: '12px 40px', borderTop: '1px solid var(--rule)', zIndex: 2 }}>
        <span style={{ font: '400 11px/1 var(--font-mono)', letterSpacing: '.1em', color: 'var(--muted)' }}>MIDNIGHT TESTNET {'·'} BLOCK {fmtBlock(block)}</span>
        <span style={{ font: '600 11px/1 var(--font-mono)', letterSpacing: '.12em', color: 'var(--ledger-text)', background: 'var(--wash)', border: '1px solid var(--ledger)', borderRadius: 2, padding: '4px 7px', opacity: .75 }}>PRIVATE BY DEFAULT</span>
        <div style={{ position: 'absolute', bottom: 'calc(100% + 1px)', left: '50%', transform: 'translate(-50%,' + (drawerOpen ? '0px' : '16px') + ')', width: 400, background: 'var(--paper)', border: '1.5px solid var(--ink)', boxShadow: '0 -10px 30px rgba(0,0,0,.2)', opacity: drawerOpen ? 1 : 0, pointerEvents: drawerOpen ? 'auto' : 'none', transition: 'transform .3s ease,opacity .3s ease', zIndex: 5 }}>
          <div style={{ display: 'flex', flexDirection: 'column', padding: '16px 20px 12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1.5px solid var(--ink)', paddingBottom: 8 }}>
              <span className="mn-label">Desk drawer</span>
              <span style={{ font: '400 10px/1 var(--font-mono)', letterSpacing: '.1em', color: 'var(--muted)' }}>EVERYTHING ELSE</span>
            </div>
            <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '11px 0', borderBottom: '1px solid var(--rule)', font: '600 11px/1 var(--font-mono)', letterSpacing: '.1em' }}>
              <span>DOCUMENTATION</span><span style={{ color: 'var(--muted)' }}>{'↗'}</span>
            </span>
            <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '11px 0', borderBottom: '1px solid var(--rule)', font: '600 11px/1 var(--font-mono)', letterSpacing: '.1em' }}>
              <span>CONTRACT</span><span style={{ fontWeight: 400, color: 'var(--ink-2)' }}>4B21E7{'…'}8D3F</span>
            </span>
            <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '11px 0', font: '600 11px/1 var(--font-mono)', letterSpacing: '.1em' }}>
              <span>NETWORK</span><span style={{ fontWeight: 400, color: 'var(--ink-2)' }}>MIDNIGHT TESTNET</span>
            </span>
            <span style={{ fontSize: 12, fontStyle: 'italic', color: 'var(--muted)', borderTop: '1px solid var(--rule)', paddingTop: 10 }}>Day and night live on the lamp chain, top right.</span>
          </div>
        </div>
        <span style={{ position: 'absolute', left: '50%', bottom: 0, transform: 'translateX(-50%)', zIndex: 6 }}>
          <button className="nd-obj" onClick={() => setDrawerOpen((o) => !o)} aria-expanded={drawerOpen} aria-label="Desk drawer: documentation and settings">
            <svg style={{ display: 'block' }} width="68" height="19" viewBox="0 0 68 19" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M2.75 19V2.75h62.5V19" />
              <path d="M26 10h16" />
            </svg>
            <span className="nd-obj-label" style={{ position: 'absolute', bottom: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)', font: '600 9px/1 var(--font-mono)', letterSpacing: '.12em', color: 'var(--muted)', whiteSpace: 'nowrap', pointerEvents: 'none', opacity: 1 }}>
              {drawerOpen ? 'CLOSE DRAWER' : 'DOCS & SETTINGS'}
            </span>
          </button>
        </span>
      </footer>
    </div>
  )
}
