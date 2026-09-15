import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Diamond, Heart, Star } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import ArrowLink from '../components/ArrowLink'
import BrandMark from '../components/BrandMark'
import ProcedureFeature from '../components/ProcedureFeature'
import Reveal from '../components/Reveal'
import SectionIntro from '../components/SectionIntro'
import Seo from '../components/Seo'
import { homeCopy, principles, seo } from '../content/site'
import { procedures } from '../content/procedures'
import { resultStories } from '../content/results'
import { reviews } from '../content/reviews'
import './home.css'

const principleIcons = { diamond: Diamond, heart: Heart, star: Star }

function PrincipleList({ className = '' }) {
  return (
    <div className={`principle-list ${className}`}>
      {principles.map((principle) => {
        const Icon = principleIcons[principle.icon]
        return (
          <div key={principle.title} className="principle-list__item">
            <Icon size={26} strokeWidth={1.25} />
            <span>{principle.title}</span>
          </div>
        )
      })}
    </div>
  )
}

export default function Home() {
  const heroRef = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroImageY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '7%'])
  const previewProcedures = ['deep-clean', 'lash-brow', 'laser-smooth', 'professional-cosmetics'].map((id) => procedures.find((item) => item.id === id))

  return (
    <div className="home-page page-texture">
      <Seo {...seo.home} />

      <section className="home-hero page-hero" ref={heroRef}>
        <div className="home-hero__copy">
          <motion.span className="eyebrow" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7 }}>
            {homeCopy.hero.eyebrow}
          </motion.span>
          <h1>
            {homeCopy.hero.title.map((line, index) => (
              <span className="home-hero__line" key={line}>
                <motion.span initial={reduced ? false : { y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.2 + index * 0.11, ease: [0.22, 1, 0.36, 1] }}>{line}</motion.span>
              </span>
            ))}
          </h1>
          <motion.p className="editorial-lead" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.65 }}>{homeCopy.hero.body}</motion.p>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.78 }}>
            <ArrowLink to="/contact">Запази час</ArrowLink>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.95 }}>
            <PrincipleList />
          </motion.div>
        </div>
        <motion.div className="home-hero__image" initial={reduced ? false : { clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} transition={{ duration: 1.15, delay: 0.08, ease: [0.77, 0, 0.18, 1] }}>
          <motion.img style={{ y: heroImageY }} initial={reduced ? false : { scale: 1.035 }} animate={{ scale: 1 }} transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }} src="images/hero-beauty.webp" alt="Портрет с естествена сияйна кожа" fetchPriority="high" />
          <div className="home-hero__script" aria-hidden="true"><span className="signature">More<br />than beauty</span><i /><small>A HEALTHIER<br />HAPPIER YOU</small></div>
        </motion.div>
      </section>

      <section className="home-procedures section">
        <div className="container">
          <div className="home-procedures__head">
            <SectionIntro {...homeCopy.procedures} />
            <Reveal variant="fadeIn" delay={0.16}><ArrowLink to="/procedures" variant="text">Разгледай всички</ArrowLink></Reveal>
          </div>
          <div className="procedure-editorial-grid">
            {previewProcedures.map((procedure, index) => <ProcedureFeature key={procedure.id} procedure={procedure} index={index} />)}
          </div>
        </div>
      </section>

      <section className="home-about">
        <Reveal className="home-about__copy" variant="revealLeft" amount={0.18}>
          <SectionIntro {...homeCopy.about} />
          <ArrowLink to="/about">Научи повече</ArrowLink>
        </Reveal>
        <Reveal className="home-about__image image-frame" variant="imageMask" direction="right" amount={0.18}><img src="images/studio-interior.webp" alt="Бутиков интериор на SKINCARE STUDIO" loading="lazy" /></Reveal>
        <Reveal className="home-about__brand" variant="fadeIn" delay={0.14} amount={0.18}><BrandMark /><p className="signature">Good skin<br />brighter you</p></Reveal>
      </section>

      <section className="philosophy-break">
        <Reveal className="philosophy-break__image image-frame" variant="imageMask" direction="left" amount={0.2}><img src="images/serum-texture.webp" alt="Перлена текстура на козметичен серум" loading="lazy" /></Reveal>
        <div className="philosophy-break__title"><Reveal><h2>Здрава кожа.<br /><em>Повече увереност.</em></h2></Reveal></div>
        <Reveal className="philosophy-break__copy" variant="revealRight" delay={0.08} amount={0.22}><p>Красивата кожа започва с правилната грижа. Довери се на професионализма, вниманието към детайла и индивидуалния подход.</p><span>BEAUTY IS A FORM OF SELF CARE</span></Reveal>
      </section>

      <section className="results-section section">
        <div className="container results-section__layout">
          <div className="results-section__intro">
            <SectionIntro eyebrow="ДОВЕРИЕ, КОЕТО СЕ ВИЖДА" title="Реални резултати" body="Всяка промяна започва с внимателна консултация и план, създаден специално за теб." />
            <Reveal variant="fadeIn" delay={0.16}><ArrowLink to="/gallery" variant="text">Разгледай галерията</ArrowLink></Reveal>
          </div>
          <div className="results-section__stories">
            {resultStories.map((story, index) => (
              <Reveal as="article" className="result-story" variant="fadeUp" delay={(index % 2) * 0.09} amount={0.16} key={story.id}>
                <div className="result-story__visual">
                  <figure><img src={story.before} alt={story.altBefore} loading="lazy" /><span>ПРЕДИ</span></figure>
                  <figure><img src={story.after} alt={story.altAfter} loading="lazy" /><span>СЛЕД</span></figure>
                </div>
                <h3>{story.title}</h3><p>{story.subtitle}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="home-reviews section--small">
        <div className="container home-reviews__layout">
          <Reveal className="home-reviews__intro" variant="revealLeft" amount={0.2}>
            <span className="eyebrow">КАКВО КАЗВАТ НАШИТЕ КЛИЕНТИ</span>
            <h2>Истински истории.<br />Лична грижа.</h2>
            <ArrowLink to="/reviews" variant="text">Виж всички отзиви</ArrowLink>
          </Reveal>
          <div className="home-reviews__quotes">
            {reviews.slice(0, 3).map((review) => (
              <Reveal as="blockquote" variant="fadeUp" delay={reviews.indexOf(review) * 0.085} amount={0.18} key={review.id}><span>“</span><p>{review.quote}</p><footer><strong>{review.name}</strong><small>{review.treatment}</small></footer></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="home-booking">
        <Reveal className="home-booking__image image-frame" variant="imageMask" direction="left" amount={0.18}><img src="images/self-care-towels.webp" alt="Ритуал за грижа с меки кърпи и козметика" loading="lazy" /></Reveal>
        <Reveal className="home-booking__copy" variant="revealRight" delay={0.06} amount={0.18}>
          <span className="eyebrow">ГОТОВА ЛИ СИ?</span>
          <h2>Запази час за своята най-добра версия</h2>
          <p>Погрижи се за себе си с професионална грижа, индивидуален подход и внимание към всеки детайл.</p>
          <ArrowLink to="/contact">Запази час</ArrowLink>
        </Reveal>
        <Reveal className="home-booking__motto" variant="fadeIn" delay={0.16} amount={0.18}><span>BEAUTY BEGINS THE MOMENT<br />YOU DECIDE TO BE</span><p className="signature">yourself</p></Reveal>
      </section>
    </div>
  )
}
