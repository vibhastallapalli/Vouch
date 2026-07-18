import EventLog from '../EventLog.jsx'
import { LISTING } from '../data.js'

export default function Register({ events }) {
  return (
    <main style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '36px 40px 48px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 36, lineHeight: 1.1, margin: 0 }}>Register for {LISTING.id}</h2>
        <span style={{ font: '400 11px/1 var(--font-mono)', letterSpacing: '.1em', color: 'var(--muted)' }}>PUBLIC RECORD · {events.length} ENTRIES</span>
      </div>
      <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: 'var(--ink-2)', maxWidth: '44em' }}>
        Every on-chain event for this listing, newest first. Each line is public: it shows that something was proved or moved, never who a ghost is or what their numbers are.
      </p>
      <div style={{ marginTop: 8 }}>
        <EventLog events={events} />
      </div>
    </main>
  )
}
