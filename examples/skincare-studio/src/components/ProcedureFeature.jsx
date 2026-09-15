import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Reveal from './Reveal'

export default function ProcedureFeature({ procedure, index }) {
  return (
    <Reveal as="article" className={`procedure-feature procedure-feature--${index + 1}`} variant="fadeUp" delay={(index % 4) * 0.085} amount={0.16}>
      <Link to="/procedures" className="procedure-feature__image image-frame" aria-label={`Разгледай ${procedure.shortTitle}`}>
        <img src={procedure.image} alt="" loading="lazy" />
      </Link>
      <div className="procedure-feature__copy">
        <div>
          <h3>{procedure.shortTitle}</h3>
          <p>{procedure.description}</p>
        </div>
        <Link className="procedure-feature__arrow" to="/procedures" aria-label={`Разгледай ${procedure.shortTitle}`}>
          <ArrowUpRight size={21} strokeWidth={1.35} />
        </Link>
      </div>
    </Reveal>
  )
}
