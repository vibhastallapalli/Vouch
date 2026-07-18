export default function SequenceNav({ steps = ['Commit', 'Prove', 'Verify'], current = 0 }) {
  return (
    <ol className="mn-seq">
      {steps.map((s, i) => (
        <li
          key={s}
          className={'mn-seq__item' + (i === current ? ' mn-seq__item--current' : i < current ? ' mn-seq__item--done' : '')}
        >
          <span className="mn-seq__num">{'0' + (i + 1)}</span>
          <span>{s}</span>
        </li>
      ))}
    </ol>
  )
}
