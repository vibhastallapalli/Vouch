export default function WalletChip({ connected = false, address = 'addr1···x7q9', busy = false, onClick }) {
  if (connected)
    return (
      <button type="button" className="mn-chip mn-chip--on" onClick={onClick} title="Wallet connected. Click to disconnect." aria-label={'Disconnect wallet ' + address}>
        <span className="mn-chip__mark">Lace</span>
        <span>{address}</span>
      </button>
    )
  return (
    <button type="button" className="mn-chip mn-chip--off" onClick={onClick}>
      <span className="mn-chip__mark">Lace</span>
      <span aria-live="polite">{busy ? 'Connecting…' : 'Connect wallet'}</span>
    </button>
  )
}
