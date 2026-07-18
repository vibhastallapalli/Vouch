export default function Status({ kind = 'recorded', children }) {
  const fallback = { recorded: 'Recorded', pending: 'Pending', void: 'Void' }
  return <span className={'mn-status mn-status--' + kind}>{children || fallback[kind]}</span>
}
