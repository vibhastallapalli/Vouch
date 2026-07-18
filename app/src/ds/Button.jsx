export default function Button({ variant = 'primary', size = 'md', children, ...rest }) {
  const cls = ['mn-btn', 'mn-btn--' + variant, size === 'lg' ? 'mn-btn--lg' : ''].filter(Boolean).join(' ')
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  )
}
