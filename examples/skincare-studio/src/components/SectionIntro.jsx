import Reveal from './Reveal'

export default function SectionIntro({ eyebrow, title, body, align = 'left', as = 'h2', className = '' }) {
  const Heading = as
  return (
    <div className={`section-intro section-intro--${align} ${className}`}>
      {eyebrow && <Reveal variant="fadeIn"><span className="eyebrow">{eyebrow}</span></Reveal>}
      <Reveal variant="headingReveal" delay={0.05}><Heading>{title}</Heading></Reveal>
      {body && <Reveal variant="fadeUp" delay={0.1}><p>{body}</p></Reveal>}
    </div>
  )
}
