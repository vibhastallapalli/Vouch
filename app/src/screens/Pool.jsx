import Button from '../ds/Button.jsx'
import { LISTING, HARD_BADGES, SOFT_FIELDS } from '../data.js'

const dirOk = (v, { dir, target }) => (dir === 'gte' ? v >= target : v <= target)
const moveInLabel = (w) => (w <= 1 ? 'THIS WEEK' : 'IN ' + w + ' WK')

export default function Pool({ entries, filters, onToggleFilter, onSetFilter, committed, onCommit, onContinueAsCommitted }) {
  const matching = entries.filter((p) => SOFT_FIELDS.every((f) => !filters[f.key] || dirOk(p.soft[f.key], filters[f.key])))
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
        <span className="mn-label" style={{ marginTop: 6 }}>Filter on preferences · self-claimed · set your own threshold</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {SOFT_FIELDS.map((f) => {
            const active = filters[f.key]
            return (
              <div key={f.key} style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <button className="nd-filterbtn" aria-pressed={!!active} onClick={() => onToggleFilter(f.key)} disabled={!!committed}>
                  <span className="nd-filterbox" aria-hidden="true" />
                  {f.label}
                </button>
                {active && (
                  <div className="nd-filterctl">
                    <button type="button" className="nd-dirbtn" onClick={() => onSetFilter(f.key, { dir: active.dir === 'gte' ? 'lte' : 'gte' })} disabled={!!committed}>
                      {active.dir === 'gte' ? 'AT LEAST' : 'AT MOST'}
                    </button>
                    <button type="button" className="nd-stepbtn" aria-label={'decrease ' + f.label + ' target'} onClick={() => onSetFilter(f.key, { target: Math.max(f.min, active.target - f.step) })} disabled={!!committed || active.target <= f.min}>−</button>
                    <span style={{ minWidth: 52, textAlign: 'center' }}>{active.target}{f.unit ? ' ' + f.unit : ''}</span>
                    <button type="button" className="nd-stepbtn" aria-label={'increase ' + f.label + ' target'} onClick={() => onSetFilter(f.key, { target: Math.min(f.max, active.target + f.step) })} disabled={!!committed || active.target >= f.max}>+</button>
                  </div>
                )}
              </div>
            )
          })}
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
                <span style={{ display: 'block' }}>MOVE-IN {moveInLabel(p.soft.moveInWeeks)} · {p.soft.leaseMonths}-MONTH LEASE</span>
                <span style={{ display: 'block' }}>{p.soft.occupants} OCCUPANT{p.soft.occupants > 1 ? 'S' : ''} · {p.soft.pets} PET{p.soft.pets === 1 ? '' : 'S'}</span>
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
