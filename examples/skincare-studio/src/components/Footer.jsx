import { Clock3, Instagram, Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { navItems, site } from '../content/site'
import BrandMark from './BrandMark'
import Reveal from './Reveal'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__main container">
        <Reveal className="site-footer__brand" variant="fadeUp" amount={0.15}>
          <BrandMark />
          <p>{site.tagline}</p>
        </Reveal>
        <Reveal className="site-footer__contact" variant="fadeUp" delay={0.07} amount={0.15}>
          <a href={`tel:${site.phoneHref}`}><Phone size={17} />{site.phone}</a>
          <a href={`mailto:${site.email}`}><Mail size={17} />{site.email}</a>
          <span><MapPin size={17} />{site.address.join(', ')}</span>
          <span><Clock3 size={17} />{site.hours[0].join(' · ')}</span>
        </Reveal>
        <Reveal as="nav" className="site-footer__nav" variant="fadeUp" delay={0.14} amount={0.15} aria-label="Навигация във футъра">
          {navItems.map((item) => <Link key={item.to} to={item.to}>{item.label}</Link>)}
        </Reveal>
        <Reveal className="site-footer__social" variant="fadeUp" delay={0.21} amount={0.15}>
          <p className="signature">More<br />than beauty</p>
          <a href={site.instagram.url} target="_blank" rel="noreferrer"><Instagram size={20} />{site.instagram.handle}</a>
        </Reveal>
      </div>
      <Reveal className="site-footer__legal container" variant="fadeIn" delay={0.1} amount={0.5}>
        <span>© 2026 SKINCARE STUDIO · DEMO</span>
        <span>Всички права запазени.</span>
      </Reveal>
    </footer>
  )
}
