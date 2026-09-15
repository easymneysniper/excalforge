import { Clock3, Instagram, Mail, MapPin, Phone } from 'lucide-react'
import BookingForm from '../components/BookingForm'
import BrandMark from '../components/BrandMark'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { seo, site } from '../content/site'
import './contact.css'

export default function Contact() {
  return (
    <div className="contact-page page-texture">
      <Seo {...seo.contact} />
      <section className="contact-hero page-hero">
        <Reveal className="contact-hero__image image-frame" variant="imageMask" direction="left" amount={0.12}><img src="images/self-care-towels.webp" alt="Спокоен ритуал за грижа" fetchPriority="high" /></Reveal>
        <Reveal className="contact-hero__copy" variant="revealRight" amount={0.12} delay={0.06}><span className="eyebrow">ТВОЕТО ВРЕМЕ ЗА ГРИЖА</span><h1>Запази своя час</h1><p>Разкажи ни от какво се нуждаеш. Ще открием подходящата процедура и удобния момент за теб.</p><p className="signature">Self care<br />looks good on you</p></Reveal>
      </section>

      <section className="contact-main">
        <Reveal className="contact-main__intro" variant="headingReveal" amount={0.18}><span className="eyebrow">НЕКА ЗАПОЧНЕМ</span><h2>Погрижи се за себе си днес</h2><p>Попълни формата и направи първата стъпка към своя личен ритуал за красота.</p><BrandMark /></Reveal>
        <Reveal className="contact-main__form" variant="fadeUp" delay={0.09} amount={0.14}><BookingForm /></Reveal>
        <aside className="contact-main__details">
          <Reveal variant="fadeUp" delay={0.14} amount={0.18}><Phone size={21} /><span><small>ТЕЛЕФОН</small><a href={`tel:${site.phoneHref}`}>{site.phone}</a></span></Reveal>
          <Reveal variant="fadeUp" delay={0.2} amount={0.18}><Instagram size={21} /><span><small>INSTAGRAM</small><a href={site.instagram.url} target="_blank" rel="noreferrer">{site.instagram.handle}</a></span></Reveal>
          <Reveal variant="fadeUp" delay={0.26} amount={0.18}><Mail size={21} /><span><small>ИМЕЙЛ</small><a href={`mailto:${site.email}`}>{site.email}</a></span></Reveal>
          <Reveal variant="fadeUp" delay={0.32} amount={0.18}><MapPin size={21} /><span><small>АДРЕС</small><p>{site.address.join(', ')}</p></span></Reveal>
          <Reveal variant="fadeUp" delay={0.38} amount={0.18}><Clock3 size={21} /><span><small>РАБОТНО ВРЕМЕ</small>{site.hours.map((row) => <p key={row[0]}>{row.join(' · ')}</p>)}</span></Reveal>
        </aside>
      </section>

      <section className="contact-closing"><Reveal className="contact-closing__image image-frame" variant="imageMask" direction="left" amount={0.18}><img src="images/flowers-detail.webp" alt="Бели цветя в меко осветено студио" width="1200" height="1800" loading="lazy" /></Reveal><Reveal className="contact-closing__copy" variant="headingReveal" amount={0.2} delay={0.07}><span>FOLLOW OUR BEAUTY STORY</span><h2>{site.instagram.handle}</h2><a href={site.instagram.url} target="_blank" rel="noreferrer"><Instagram size={20} />Последвай ни</a></Reveal><Reveal className="contact-closing__texture" variant="fadeIn" amount={0.18} delay={0.15}><img src="images/serum-texture.webp" alt="" loading="lazy" /><p className="signature">More than beauty</p></Reveal></section>
    </div>
  )
}
