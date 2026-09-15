import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Clock3, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import ArrowLink from '../components/ArrowLink'
import BrandMark from '../components/BrandMark'
import FaqAccordion from '../components/FaqAccordion'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { faqItems } from '../content/faq'
import { procedureCategories, procedures } from '../content/procedures'
import { reviews } from '../content/reviews'
import { seo } from '../content/site'
import { filterProcedures } from '../utils/filterProcedures'
import './procedures.css'

function TreatmentCard({ item, index }) {
  return (
    <Reveal as="article" className={`treatment-card treatment-card--${(index % 4) + 1}`} variant="fadeUp" delay={(index % 4) * 0.08} amount={0.15} layout exit={{ opacity: 0, y: -12 }}>
      <Link to="/contact" className="treatment-card__image image-frame" aria-label={`Запази час за ${item.title}`}>
        <img src={item.image} alt="" loading="lazy" />
      </Link>
      <div className="treatment-card__copy">
        <div className="treatment-card__title"><h3>{item.shortTitle}</h3><Link to="/contact" aria-label={`Запази час за ${item.title}`}><ArrowUpRight size={19} /></Link></div>
        <p>{item.description}</p>
        <div className="treatment-card__meta"><span><Clock3 size={14} />{item.duration}</span><strong>от {item.price} €</strong></div>
      </div>
    </Reveal>
  )
}

export default function Procedures() {
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => filterProcedures(procedures, category, query), [category, query])
  const featured = procedures.find((item) => item.featured)

  return (
    <div className="procedures-page page-texture">
      <Seo {...seo.procedures} />
      <section className="procedures-hero page-hero">
        <Reveal className="procedures-hero__copy" variant="revealLeft" amount={0.12}>
          <span className="eyebrow">ПРОФЕСИОНАЛНА ГРИЖА · РЕАЛНИ РЕЗУЛТАТИ</span>
          <h1>Процедури, създадени за твоята най-добра версия</h1>
          <p className="editorial-lead">Съчетаваме модерни технологии, професионализъм и индивидуален подход, за да подчертаем твоята естествена красота.</p>
          <ArrowLink to="/contact">Запази час</ArrowLink>
          <div className="procedures-hero__meta"><span>Доказани методи</span><span>Индивидуален подход</span><span>Модерни технологии</span></div>
        </Reveal>
        <Reveal className="procedures-hero__image image-frame" variant="imageMask" direction="right" amount={0.12} delay={0.06}><img src="images/hero-beauty.webp" alt="Естествена сияйна кожа" fetchPriority="high" /><div><p className="signature">Invest<br />in your skin</p><span>HEALTHY SKIN · HAPPIER YOU</span></div></Reveal>
      </section>

      <section className="treatments-section section">
        <div className="container">
          <div className="treatments-section__heading"><Reveal variant="headingReveal"><span className="eyebrow">ИЗБЕРИ СВОЯТА ГРИЖА</span><h2>Нашите процедури</h2></Reveal><Reveal variant="fadeUp" delay={0.1}><p>Внимателно подбрани ритуали за лице, тяло и естествено излъчване.</p></Reveal></div>
          <Reveal className="treatment-toolbar" variant="fadeIn" delay={0.14} amount={0.25}>
            <div className="treatment-filters" aria-label="Филтрирай процедурите">
              {procedureCategories.map((item) => <button key={item.id} type="button" className={category === item.id ? 'is-active' : ''} onClick={() => setCategory(item.id)}>{item.label}</button>)}
            </div>
            <label className="treatment-search"><Search size={17} aria-hidden="true" /><span className="sr-only">Търси процедура</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Търси процедура…" /></label>
          </Reveal>
          <motion.div className="treatment-grid" layout>
            <AnimatePresence mode="popLayout">
              {filtered.map((item, index) => <TreatmentCard item={item} index={index} key={item.id} />)}
            </AnimatePresence>
          </motion.div>
          {filtered.length === 0 && <p className="treatment-empty">Опитай с друга категория или дума.</p>}
        </div>
      </section>

      <section className="featured-treatment">
        <Reveal className="featured-treatment__image image-frame" variant="imageMask" direction="left" amount={0.18}><img src="images/treatment-facial.webp" alt="Професионална грижа за лице" loading="lazy" /><span>BEAUTY IS A FORM<br />OF SELF CARE</span></Reveal>
        <Reveal className="featured-treatment__copy" variant="revealRight" amount={0.18} delay={0.06}>
          <span className="eyebrow">НАЙ-ТЪРСЕНА ПРОЦЕДУРА</span>
          <h2>{featured.title}</h2>
          <p>{featured.description}</p>
          <div className="featured-treatment__actions"><strong>от {featured.price} €</strong><ArrowLink to="/contact">Запази час</ArrowLink></div>
        </Reveal>
        <Reveal className="featured-treatment__benefits" variant="fadeUp" amount={0.18} delay={0.14}>
          {featured.benefits.map((benefit, index) => <div key={benefit}><span>0{index + 1}</span><p>{benefit}</p></div>)}
          <BrandMark />
        </Reveal>
      </section>

      <section className="procedure-mosaic section">
        <div className="container procedure-mosaic__grid">
          <Reveal className="procedure-mosaic__copy" variant="headingReveal" amount={0.2}><span className="eyebrow">ГРИЖА С ХАРАКТЕР</span><h2>Повече от процедура</h2><p>Всеки детайл — от първата консултация до финалния домашен ритуал — е част от едно спокойно и лично изживяване.</p></Reveal>
          <Reveal className="procedure-mosaic__image image-frame" variant="imageMask" direction="right" amount={0.18}><img src="images/products-still-life.webp" alt="Професионална козметика" loading="lazy" /></Reveal>
          <Reveal className="procedure-mosaic__image procedure-mosaic__image--tall image-frame" variant="imageMask" direction="left" amount={0.18} delay={0.09}><img src="images/body-care.webp" alt="Момент за грижа и спокойствие" loading="lazy" /></Reveal>
          <Reveal className="procedure-mosaic__note" variant="fadeIn" amount={0.22} delay={0.16}><p className="signature">Healthy skin<br />confident you</p><BrandMark /></Reveal>
        </div>
      </section>

      <section className="procedures-reviews section--small">
        <div className="container procedures-reviews__layout">
          <Reveal variant="revealLeft" amount={0.2}><span className="eyebrow">РЕАЛНИ ХОРА · ЛИЧНИ ИСТОРИИ</span><h2>Какво казват нашите клиенти</h2><p>Доверието е най-голямото ни признание.</p></Reveal>
          <div className="procedures-reviews__quotes">{reviews.slice(0, 3).map((review, index) => <Reveal as="blockquote" variant="fadeUp" delay={index * 0.08} amount={0.18} key={review.id}><span>“</span><p>{review.quote}</p><strong>{review.name}</strong></Reveal>)}</div>
        </div>
      </section>

      <section className="faq-section">
        <Reveal className="faq-section__intro" variant="revealLeft" amount={0.18}><span className="eyebrow">ЧЕСТО ЗАДАВАНИ ВЪПРОСИ</span><h2>Имате въпроси?</h2><p>Събрахме най-важното, за да се чувстваш спокойна и информирана.</p><ArrowLink to="/contact" variant="text">Свържи се с нас</ArrowLink></Reveal>
        <Reveal className="faq-section__list" variant="fadeIn" amount={0.12} delay={0.06}><FaqAccordion items={faqItems} /></Reveal>
        <Reveal className="faq-section__art" variant="imageMask" direction="right" amount={0.18} delay={0.12}><img src="images/flowers-detail.webp" alt="Бели цветя в топла светлина" width="1200" height="1800" loading="lazy" /><p className="signature">Healthy skin<br />happier you</p></Reveal>
      </section>

      <section className="procedures-booking">
        <Reveal className="procedures-booking__image image-frame" variant="imageMask" direction="left" amount={0.18}><img src="images/self-care-towels.webp" alt="Бутиков ритуал за грижа" loading="lazy" /></Reveal>
        <Reveal className="procedures-booking__copy" variant="revealRight" amount={0.18} delay={0.06}><span className="eyebrow">ТВОЯТА ПО-КРАСИВА ВЕРСИЯ ЗАПОЧВА ТУК</span><h2>Готова ли си да се погрижиш за себе си?</h2><p>Запази своя час и направи първата крачка към по-здрава, сияйна и уверена кожа.</p><ArrowLink to="/contact">Запази час</ArrowLink></Reveal>
        <Reveal className="procedures-booking__brand" variant="fadeIn" amount={0.18} delay={0.14}><BrandMark /><span>MORE THAN BEAUTY<br />A HEALTHIER YOU</span></Reveal>
      </section>
    </div>
  )
}
