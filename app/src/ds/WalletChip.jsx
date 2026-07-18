export default function WalletChip({ connected = false, address = 'addr1···x7q9', onClick }) {
  if (connected)
    return (
      <button type="button" className="mn-chip mn-chip--on" onClick={onClick} title="Lace wallet connected">
        <span className="mn-chip__mark">Lace</span>
        <span>{address}</span>
      </button>
    )
  return (
    <button type="button" className="mn-chip mn-chip--off" onClick={onClick}>
      <span className="mn-chip__mark">Lace</span>
      <span>Connect wallet</span>
    </button>
  )
}
