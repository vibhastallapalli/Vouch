import Button from '../ds/Button.jsx'
import { LISTING, HARD_BADGES, SOFT_FILTERS } from '../data.js'

export default function Pool({ entries, filters, onToggleFilter, committed, onCommit, onContinueAsCommitted }) {
  const matching = entries.filter((p) => SOFT_FILTERS.every((f) => !filters.has(f.key) || f.matches(p)))
  return (
    <main style={{ display: 'flex', flexDirection: 'column', gap: 18, padding: '36px 40px 48px', maxWidth: 1080 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, flexWrap: 'wrap' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 36, lineHeight: 1.1, margin: 0 }}>The anonymous pool</h2>
        <span style={{ font: '400 11px/1 var(--font-mono)', letterSpacing: '.1em', color: 'var(--muted)' }}>
          {LISTING.id} · {matching.length} OF {entries.length} MATCH
        </span>
      </div>
      <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: 'var(--ink-2)', maxWidth: '46em' }}>
        Every entry proved every required badge, so everyone here is qualified by construction. Narrow on neutral preferences; nobody is exposed while you filter. Committing to one entry marks that applicant; only they can open their identity.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <span className="mn-label">Required badges · proven by every entry</span>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {HARD_BADGES.map((b) => <span key={b.key} className="nd-badge" title={b.rule}>{b.label}</span>)}
        </div>
        <span className="mn-label" style={{ marginTop: 6 }}>Filter on preferences · self-claimed</span>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {SOFT_FILTERS.map((f) => (
            <button key={f.key} className="nd-filterbtn" aria-pressed={filters.has(f.key)} onClick={() => onToggleFilter(f.key)} disabled={!!committed}>
              <span className="nd-filterbox" aria-hidden="true" />
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {committed && (
        <div style={{ border: '1.5px solid var(--seal)', background: 'var(--wash)', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 15, lineHeight: 1.4 }}>
            Committed to entry {committed.entryNo}. The commit marks them; identity stays sealed until they open it.
          </span>
          <Button onClick={onContinueAsCommitted}>Continue as the committed applicant</Button>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20, marginTop: 4 }}>
        {matching.map((p) => {
          const isCommitted = committed && committed.id === p.id
          return (
            <div key={p.id} className="nd-poolentry">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 21 }}>Entry {p.entryNo}</span>
                <span style={{ font: '600 10px/1 var(--font-mono)', letterSpacing: '.1em', color: isCommitted ? 'var(--seal)' : 'var(--muted)' }}>
                  {isCommitted ? 'COMMITTED' : 'GHOST'}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {HARD_BADGES.map((b) => <span key={b.key} className="nd-badge">{b.label}</span>)}
              </div>
              <div style={{ font: '400 12px/1.7 var(--font-mono)', color: 'var(--ink-2)' }}>
                <span style={{ display: 'block' }}>MOVE-IN {p.soft.moveIn.toUpperCase()}</span>
                <span style={{ display: 'block' }}>{p.soft.leaseMonths}-MONTH LEASE · PETS: {p.soft.pets.toUpperCase()} · {p.soft.occupants} OCCUPANT{p.soft.occupants > 1 ? 'S' : ''}</span>
                <span style={{ display: 'block', color: 'var(--muted)' }}>COMMITMENT {p.commitment}</span>
              </div>
              {!committed && <span><Button variant="secondary" onClick={() => onCommit(p)}>Commit to this entry</Button></span>}
            </div>
          )
        })}
      </div>
      {matching.length === 0 && (
        <p style={{ margin: 0, fontSize: 15, color: 'var(--ink-2)' }}>
          No entries match these filters. Loosen one; nobody was exposed while you looked.
        </p>
      )}
    </main>
  )
}
