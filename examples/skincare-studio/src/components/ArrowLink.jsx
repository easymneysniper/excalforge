import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ArrowLink({ to, children, variant = 'solid', className = '' }) {
  return (
    <Link className={`arrow-link arrow-link--${variant} ${className}`} to={to}>
      <span>{children}</span><ArrowRight size={19} strokeWidth={1.5} />
    </Link>
  )
}
