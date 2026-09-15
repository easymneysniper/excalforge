import { AnimatePresence } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { useCallback, useState } from 'react'
import ArrowLink from '../components/ArrowLink'
import Lightbox from '../components/Lightbox'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { galleryItems } from '../content/gallery'
import { seo } from '../content/site'
import './gallery.css'

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(null)
  const close = useCallback(() => setActiveIndex(null), [])
  const change = useCallback((index) => setActiveIndex(index), [])
  return (
    <div className="gallery-page page-texture">
      <Seo {...seo.gallery} />
      <section className="gallery-hero page-hero">
        <Reveal className="gallery-hero__copy" variant="revealLeft" amount={0.12}><span className="eyebrow">ПОГЛЕД ОТБЛИЗО</span><h1>Красотата живее в детайла</h1><p>Атмосфера, ритуали и моменти, създадени с внимание.</p><ArrowLink to="/contact">Запази час</ArrowLink></Reveal>
        <Reveal className="gallery-hero__image image-frame" variant="imageMask" direction="right" amount={0.12} delay={0.06}><img src="images/brow-detail.webp" alt="Красиво оформена естествена вежда" fetchPriority="high" /></Reveal>
        <Reveal className="gallery-hero__aside" variant="fadeIn" amount={0.12} delay={0.14}><img src="images/flowers-detail.webp" alt="Бели цветя" /><p className="signature">Beauty<br />in every detail</p></Reveal>
      </section>

      <section className="gallery-intro section--small"><div className="container gallery-intro__layout"><Reveal variant="headingReveal"><span className="eyebrow">SKINCARE STUDIO</span><h2>Нашият свят</h2></Reveal><Reveal as="p" variant="fadeUp" delay={0.1}>Спокойна среда, професионална грижа и малките детайли, които превръщат всяко посещение в лично изживяване.</Reveal></div></section>

      <section className="gallery-grid container" aria-label="Галерия със снимки">
        {galleryItems.map((item, index) => (
          <Reveal as="button" className={`gallery-item gallery-item--${item.size}`} variant="imageMask" direction={index % 2 === 0 ? 'right' : 'left'} delay={(index % 3) * 0.075} amount={0.16} type="button" key={item.id} onClick={() => setActiveIndex(index)} aria-label={`Отвори: ${item.caption}`}>
            <img src={item.src} alt={item.alt} loading={index > 1 ? 'lazy' : undefined} />
            <span><small>{String(index + 1).padStart(2, '0')}</small>{item.caption}<ArrowUpRight size={19} /></span>
          </Reveal>
        ))}
      </section>

      <section className="gallery-quote"><img src="images/serum-texture.webp" alt="" loading="lazy" /><Reveal className="gallery-quote__copy" variant="headingReveal" amount={0.22}><span>SELF CARE · BEAUTY · CONFIDENCE</span><h2>Грижа, която се усеща.<br />Красота, която остава.</h2><ArrowLink to="/contact">Твоят час</ArrowLink></Reveal></section>

      <AnimatePresence>{activeIndex !== null && <Lightbox items={galleryItems} activeIndex={activeIndex} onChange={change} onClose={close} />}</AnimatePresence>
    </div>
  )
}
