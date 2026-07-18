function Rows({ rows }) {
  return (
    <div>
      {rows.map((r, i) => (
        <div className="mn-ledger__row" key={i}>
          <span className="mn-ledger__label">{r.label}</span>
          <span className={'mn-ledger__value' + (r.mono ? ' mn-ledger__value--mono' : '')}>{r.value}</span>
        </div>
      ))}
    </div>
  )
}

export default function LedgerSplit({
  publicTitle = 'Public · on the chain',
  privateTitle = 'Private · never left this device',
  publicRows = [],
  privateRows = [],
  publicNote,
  privateNote,
  seal = null,
}) {
  return (
    <div className="mn-ledger">
      <section className="mn-ledger__col mn-ledger__col--public">
        <h3 className="mn-ledger__head">{publicTitle}</h3>
        <Rows rows={publicRows} />
        {publicNote && <p className="mn-ledger__note">{publicNote}</p>}
        {seal && <div className="mn-ledger__seal">{seal}</div>}
      </section>
      <div className="mn-ledger__perf" aria-hidden="true" />
      <section className="mn-ledger__col mn-ledger__col--private">
        <h3 className="mn-ledger__head">{privateTitle}</h3>
        <Rows rows={privateRows} />
        {privateNote && <p className="mn-ledger__note">{privateNote}</p>}
      </section>
    </div>
  )
}
