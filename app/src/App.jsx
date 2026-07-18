import { useEffect, useState } from 'react'
import WalletChip from './ds/WalletChip.jsx'
import { listWallets, connectWallet, shortAddress, NETWORK_ID } from './wallet.js'
import { CONTRACT_ADDRESS, readWalletConfig, probeProofServer } from './chain.js'
import { APP_NAME, LISTING, PERSONAS, SEED_EVENTS, APPLY_TX, COMMIT_TX, REVEAL_TX, today } from './data.js'
import Desk from './screens/Desk.jsx'
import Apply from './screens/Apply.jsx'
import Flight from './screens/Flight.jsx'
import Applied from './screens/Applied.jsx'
import Pool from './screens/Pool.jsx'
import Reveal from './screens/Reveal.jsx'
import Register from './screens/Register.jsx'

const PROOF_SECONDS = 7.5
const RING = APP_NAME.toUpperCase() + ' · PROOF NOTARIZED · '
const DEMO_APPLICANT = PERSONAS[0]

const fmtBlock = (n) => n.toLocaleString('en-US')

export default function App() {
  const [screen, setScreen] = useState('desk')
  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem('nd-mode')
    return saved === 'day' || saved === 'night' ? saved : 'night'
  })
  const [wallet, setWallet] = useState(null)
  const [walletCfg, setWalletCfg] = useState(null)
  const [proofServerUp, setProofServerUp] = useState(null)
  const [connecting, setConnecting] = useState(false)
  const [pick, setPick] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [t, setT] = useState(0)
  const [landingError, setLandingError] = useState('')
  const [block, setBlock] = useState(1204867)
  const [events, setEvents] = useState(SEED_EVENTS)
  const [applied, setApplied] = useState(false)
  const [filters, setFilters] = useState(new Set())
  const [committed, setCommitted] = useState(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const i = setInterval(() => setBlock((b) => b + 1), 6000)
    return () => clearInterval(i)
  }, [])

  useEffect(() => {
    if (screen !== 'flight') return
    // Wall-clock elapsed, not tick counting: browsers clamp timers to one
    // tick per second in background tabs, which would stretch the flight.
    const start = Date.now()
    const i = setInterval(() => setT(Math.round((Date.now() - start) / 100) / 10), 100)
    return () => clearInterval(i)
  }, [screen])

  useEffect(() => {
    if (screen === 'flight' && t >= PROOF_SECONDS + 0.1) {
      setEvents((es) => es.map((e) => (e.no === DEMO_APPLICANT.entryNo ? { ...e, kind: 'recorded', tx: APPLY_TX } : e)))
      setApplied(true)
      setScreen('applied')
    }
  }, [t, screen])

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
      const cfg = await readWalletConfig(api)
      setWalletCfg(cfg)
      setLandingError(cfg && !cfg.networkMatches
        ? 'Wallet is on ' + cfg.networkId + '; this app expects ' + NETWORK_ID + '. Switch the network in the wallet settings.'
        : '')
      setProofServerUp(cfg ? await probeProofServer(cfg.proverServerUri) : null)
    } catch (err) {
      setLandingError(err.message)
    } finally {
      setConnecting(false)
    }
  }

  const toggleWallet = () => {
    if (connecting) return
    if (wallet) { setWallet(null); setWalletCfg(null); setProofServerUp(null); setPick(null); return }
    if (pick) { setPick(null); return }
    const found = listWallets()
    // MOCK: with no wallet extension installed, connect falls back to a local UI toggle
    // with a placeholder address so the flow still runs. Labeled in the README.
    if (found.length === 0) { setWallet({ mock: true, address: 'addr1···x7q9' }); setLandingError(''); return }
    if (found.length === 1) { connectTo(found[0]); return }
    setPick(found)
  }

  const connected = !!wallet

  const goDesk = () => { setScreen('desk'); setLandingError('') }
  const goApply = () => {
    if (!connected) {
      setLandingError('Connect your wallet first. Your address is public; your credentials are not.')
      return
    }
    setLandingError('')
    setScreen(applied ? 'applied' : 'apply')
  }
  const goPool = () => setScreen('pool')
  const goRegister = () => setScreen('register')

  const generateProof = () => {
    setEvents((es) => [
      { no: DEMO_APPLICANT.entryNo, date: today(), event: 'Application recorded', detail: 'Nullifier ' + DEMO_APPLICANT.nullifier, tx: '', kind: 'pending' },
      ...es.filter((e) => e.no !== DEMO_APPLICANT.entryNo),
    ])
    setT(0)
    setScreen('flight')
  }

  const toggleFilter = (key) =>
    setFilters((f) => {
      const next = new Set(f)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })

  const commitTo = (p) => {
    setCommitted(p)
    setEvents((es) => [
      { no: '0108', date: today(), event: 'Landlord committed', detail: 'Entry ' + p.entryNo + ' marked · identity still sealed', tx: COMMIT_TX, kind: 'recorded' },
      ...es,
    ])
  }

  const reveal = () => {
    setRevealed(true)
    setEvents((es) => [
      { no: '0109', date: today(), event: 'Reveal and deposit', detail: committed.identity + ' · deposit ' + LISTING.deposit.toLocaleString('en-US') + ' into escrow', tx: REVEAL_TX, kind: 'recorded' },
      ...es,
    ])
  }

  const poolEntries = PERSONAS.filter((p) => p.preApplied || (p.id === DEMO_APPLICANT.id && applied))
  const proofCount = events.filter((e) => e.kind === 'recorded' && e.event === 'Application recorded').length
  const onApplySide = ['apply', 'flight', 'applied', 'reveal'].includes(screen)
  const navStyle = (active) => ({ color: active ? 'var(--ink)' : 'var(--muted)', borderBottom: '1.5px solid ' + (active ? 'var(--seal)' : 'transparent') })

  return (
    <div data-card data-mode={mode} style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--card-surface)', color: 'var(--ink)', fontFamily: 'var(--font-body)', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', right: -96, top: -64, width: 520, height: 520, pointerEvents: 'none', opacity: 'var(--pool)', background: 'radial-gradient(closest-side,rgba(255,190,116,.22),rgba(255,190,116,.10) 42%,rgba(255,190,116,0) 72%)', zIndex: 1 }} />

      <header style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, padding: '16px 176px 16px 40px', borderBottom: '1.5px solid var(--ink)', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 28, minWidth: 0 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 21, lineHeight: 1, whiteSpace: 'nowrap' }}>{APP_NAME}</span>
          <nav style={{ display: 'flex', gap: 20 }}>
            <button className="nd-navbtn" onClick={goDesk} style={navStyle(screen === 'desk')}>DESK</button>
            <button className="nd-navbtn" onClick={goApply} style={navStyle(onApplySide)}>APPLY</button>
            <button className="nd-navbtn" onClick={goPool} style={navStyle(screen === 'pool')}>POOL</button>
            <button className="nd-navbtn" onClick={goRegister} style={navStyle(screen === 'register')}>REGISTER</button>
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
        {screen === 'desk' && (
          <Desk
            ring={RING}
            poolCount={poolEntries.length}
            proofCount={proofCount}
            proofSeconds={PROOF_SECONDS}
            events={events}
            landingError={landingError}
            onApply={goApply}
            onPool={goPool}
            onRegister={goRegister}
          />
        )}
        {screen === 'apply' && (
          <Apply persona={DEMO_APPLICANT} applied={applied} error={landingError} onGenerate={generateProof} onOpenReceipt={() => setScreen('applied')} />
        )}
        {screen === 'flight' && <Flight t={t} proofSeconds={PROOF_SECONDS} ring={RING} />}
        {screen === 'applied' && <Applied persona={DEMO_APPLICANT} ring={RING} onPool={goPool} onRegister={goRegister} />}
        {screen === 'pool' && (
          <Pool
            entries={poolEntries}
            filters={filters}
            onToggleFilter={toggleFilter}
            committed={committed}
            onCommit={commitTo}
            onContinueAsCommitted={() => setScreen('reveal')}
          />
        )}
        {screen === 'reveal' && committed && (
          <Reveal persona={committed} revealed={revealed} ring={RING} onReveal={reveal} onRegister={goRegister} />
        )}
        {screen === 'register' && <Register events={events} />}
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
              <span>LISTING</span><span style={{ fontWeight: 400, color: 'var(--ink-2)' }}>{LISTING.id}</span>
            </span>
            <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '11px 0', borderBottom: '1px solid var(--rule)', font: '600 11px/1 var(--font-mono)', letterSpacing: '.1em' }}>
              <span>CONTRACT</span>
              <span style={{ fontWeight: 400, color: CONTRACT_ADDRESS ? 'var(--ink-2)' : 'var(--muted)' }}>
                {CONTRACT_ADDRESS ? shortAddress(CONTRACT_ADDRESS).toUpperCase() : 'DEPLOY PENDING'}
              </span>
            </span>
            <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '11px 0', borderBottom: walletCfg ? '1px solid var(--rule)' : 'none', font: '600 11px/1 var(--font-mono)', letterSpacing: '.1em' }}>
              <span>NETWORK</span>
              <span style={{ fontWeight: 400, color: walletCfg && !walletCfg.networkMatches ? 'var(--seal)' : 'var(--ink-2)' }}>
                {walletCfg ? walletCfg.networkId.toUpperCase() + (walletCfg.networkMatches ? '' : ' · EXPECTED ' + NETWORK_ID.toUpperCase()) : NETWORK_ID.toUpperCase() + ' · WALLET NOT READ'}
              </span>
            </span>
            {walletCfg && (
              <>
                <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, padding: '11px 0', borderBottom: '1px solid var(--rule)', font: '600 11px/1 var(--font-mono)', letterSpacing: '.1em' }}>
                  <span style={{ flex: 'none' }}>INDEXER</span><span style={{ fontWeight: 400, color: 'var(--ink-2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{walletCfg.indexerUri}</span>
                </span>
                <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, padding: '11px 0', font: '600 11px/1 var(--font-mono)', letterSpacing: '.1em' }}>
                  <span style={{ flex: 'none' }}>PROOF SERVER</span>
                  <span style={{ fontWeight: 400, color: proofServerUp ? 'var(--ink-2)' : 'var(--seal)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {walletCfg.proverServerUri}{proofServerUp === false ? ' · UNREACHABLE' : ''}
                  </span>
                </span>
              </>
            )}
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
