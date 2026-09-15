import ArrowLink from '../components/ArrowLink'
import BrandMark from '../components/BrandMark'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { reviews } from '../content/reviews'
import { seo } from '../content/site'
import './reviews.css'

export default function Reviews() {
  return (
    <div className="reviews-page page-texture">
      <Seo {...seo.reviews} />
      <section className="reviews-hero page-hero">
        <Reveal className="reviews-hero__copy" variant="revealLeft" amount={0.12}><span className="eyebrow">ИСТИНСКИ ИСТОРИИ · ЛИЧНА ГРИЖА</span><h1>Красотата започва с доверие</h1><p>За нас всяко мнение е история за отношение, спокойствие и време, посветено на себе си.</p></Reveal>
        <Reveal className="reviews-hero__portrait image-frame" variant="imageMask" direction="right" amount={0.12} delay={0.06}><img src="images/body-care.webp" alt="Момент на спокойствие и увереност" fetchPriority="high" /></Reveal>
        <Reveal className="reviews-hero__quote" variant="fadeIn" amount={0.12} delay={0.15}><span>“</span><p>{reviews[0].quote}</p><strong>{reviews[0].name}</strong><small>{reviews[0].treatment}</small></Reveal>
      </section>

      <section className="reviews-editorial section">
        <div className="container reviews-editorial__head"><Reveal variant="headingReveal"><span className="eyebrow">ВАШЕТО ДОВЕРИЕ</span><h2>Думи, които остават</h2></Reveal><Reveal as="p" variant="fadeUp" delay={0.1}>Вярваме, че истинската грижа се разпознава в усещането — по време на процедурата и дълго след нея.</Reveal></div>
        <div className="container reviews-editorial__grid">
          {reviews.slice(1).map((review, index) => (
            <Reveal as="blockquote" className={`review-story review-story--${index + 1}`} variant={index % 2 === 0 ? 'fadeUp' : 'revealRight'} delay={(index % 3) * 0.08} amount={0.16} key={review.id}>
              <div className="review-story__number">0{index + 2}</div>
              <span>“</span><p>{review.quote}</p>
              <footer><strong>{review.name}</strong><small>{review.treatment}</small></footer>
            </Reveal>
          ))}
          <Reveal className="review-story__image review-story__image--one image-frame" variant="imageMask" direction="right" amount={0.16}><img src="images/treatment-facial.webp" alt="Спокоен момент по време на терапия" loading="lazy" /></Reveal>
          <Reveal className="review-story__image review-story__image--two image-frame" variant="imageMask" direction="left" amount={0.16} delay={0.08}><img src="images/products-still-life.webp" alt="Професионална козметична грижа" loading="lazy" /></Reveal>
        </div>
      </section>

      <section className="reviews-philosophy"><Reveal className="reviews-philosophy__image image-frame" variant="imageMask" direction="left" amount={0.18}><img src="images/studio-interior.webp" alt="Бутиково пространство за красота" loading="lazy" /></Reveal><Reveal className="reviews-philosophy__copy" variant="revealRight" amount={0.18} delay={0.08}><BrandMark /><p className="signature">More than beauty</p><h2>Твоето време.<br />Твоята грижа.</h2><ArrowLink to="/contact">Запази час</ArrowLink></Reveal></section>
    </div>
  )
}
