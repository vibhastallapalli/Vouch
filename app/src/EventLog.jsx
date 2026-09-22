const grid = {
  display: 'grid',
  gridTemplateColumns: '56px 104px 1fr 168px 132px',
  gap: 16,
}

export default function EventLog({ events }) {
  return (
    <div role="table" aria-label="Register events" aria-live="polite" aria-relevant="additions text" style={{ position: 'relative' }}>
      <span aria-hidden="true" style={{ position: 'absolute', left: 63, top: 0, bottom: 0, width: 1, background: 'var(--seal)', opacity: .35, pointerEvents: 'none' }} />
      <div role="row" style={{ ...grid, padding: '0 12px 8px 0', borderBottom: '1.5px solid var(--ink)', font: '600 10px/1 var(--font-mono)', letterSpacing: '.12em', color: 'var(--muted)' }}>
        <span role="columnheader">NO.</span><span role="columnheader">DATE</span><span role="columnheader">EVENT</span><span role="columnheader">TRANSACTION</span><span role="columnheader" style={{ textAlign: 'right' }}>STATUS</span>
      </div>
      {events.map((e) => {
        const pending = e.kind === 'pending'
        return (
          <div role="row" key={e.no} style={{ ...grid, alignItems: 'center', padding: '11px 12px 11px 0', borderBottom: '1px ' + (pending ? 'dashed' : 'solid') + ' var(--rule)' }}>
            <span role="cell" style={{ font: '400 12px/1.4 var(--font-mono)', color: 'var(--muted)' }}>{e.no}</span>
            <span role="cell" style={{ font: '400 12px/1.4 var(--font-mono)', color: 'var(--ink-2)' }}>{e.date}</span>
            <span role="cell" style={{ fontSize: 15, lineHeight: 1.4 }}>
              <span>{e.event}</span>
              {e.detail && <span style={{ display: 'block', font: '400 12px/1.4 var(--font-mono)', color: 'var(--muted)', marginTop: 2 }}>{e.detail}</span>}
            </span>
            <span role="cell" style={{ font: '400 12px/1.4 var(--font-mono)', color: pending ? 'var(--muted)' : 'var(--ink-2)' }}>{pending ? '…' : e.tx}</span>
            <span role="cell" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 7 }}>
              {!pending && <span aria-hidden="true" style={{ width: 9, height: 9, borderRadius: '50%', border: '1.5px solid var(--seal)', flex: 'none' }} />}
              <span style={{ font: '600 11px/1 var(--font-mono)', letterSpacing: '.1em', color: pending ? 'var(--muted)' : 'var(--ink)' }}>{pending ? 'PENDING' : 'RECORDED'}</span>
            </span>
          </div>
        )
      })}
    </div>
  )
}
