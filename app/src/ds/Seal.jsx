import { useId } from 'react'

export default function Seal({
  mode = 'stamped',
  size = 160,
  ring = 'PRODUCT NAME · PROOF NOTARIZED · ',
  center = 'RECORDED',
  duration = 6,
}) {
  const id = useId()
  return (
    <span className={'mn-seal mn-seal--' + mode} style={{ width: size, height: size, '--seal-dur': duration + 's' }}>
      <svg viewBox="0 0 120 120" width={size} height={size} role="img" aria-label={'Seal: ' + center}>
        <circle className="mn-seal__outer" cx="60" cy="60" r="56" fill="none" strokeWidth="2.5" pathLength="100" />
        <circle className="mn-seal__inner" cx="60" cy="60" r="36" fill="none" strokeWidth="1.2" />
        <path id={id} d="M 60 15 a 45 45 0 1 1 -0.01 0" fill="none" />
        <text className="mn-seal__ring" fontSize="8.5" letterSpacing="2.4">
          <textPath href={'#' + id}>{ring}</textPath>
        </text>
        <text className="mn-seal__center" x="60" y="63.5" textAnchor="middle" fontSize="10" letterSpacing="1.2">
          {center}
        </text>
      </svg>
    </span>
  )
}
