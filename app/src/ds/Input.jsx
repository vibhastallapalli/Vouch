import { useId } from 'react'

export default function Input({ label, note, privacy, id, ...rest }) {
  const autoId = useId()
  const iid = id || autoId
  return (
    <div className={'mn-field' + (privacy === 'private' ? ' mn-field--private' : '')}>
      {label && (
        <label className="mn-label" htmlFor={iid}>
          {label}
          {privacy === 'private' && <span className="mn-tag-private">Private</span>}
        </label>
      )}
      <input id={iid} className="mn-input" {...rest} />
      {note && <p className="mn-field__note">{note}</p>}
    </div>
  )
}
