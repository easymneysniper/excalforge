import { Award, Gem, Heart, Leaf, Instagram, Mail, MapPin, Phone } from 'lucide-react'
import ArrowLink from '../components/ArrowLink'
import BookingForm from '../components/BookingForm'
import BrandMark from '../components/BrandMark'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { aboutCopy, seo, site } from '../content/site'
import { reviews } from '../content/reviews'
import './about.css'

const values = [
  { icon: Gem, title: 'Професионализъм', text: 'Експертиза и внимание' },
  { icon: Heart, title: 'Личен подход', text: 'Грижа според теб' },
  { icon: Leaf, title: 'Модерни технологии', text: 'Подбрани методи' },
  { icon: Award, title: 'Грижа, която остава', text: 'Красота с увереност' },
]

export default function About() {
  return (
    <div className="about-page page-texture">
      <Seo {...seo.about} />
      <section className="about-hero page-hero">
        <Reveal className="about-hero__copy" variant="revealLeft" amount={0.12}>
          <span className="eyebrow">{aboutCopy.hero.eyebrow}</span>
          <h1>{aboutCopy.hero.title}</h1>
          <p className="about-hero__lead">{aboutCopy.hero.lead}</p>
          <p>{aboutCopy.hero.body}</p>
          <ArrowLink to="/contact">Нашата история</ArrowLink>
        </Reveal>
        <Reveal className="about-hero__studio image-frame" variant="imageMask" direction="right" amount={0.12} delay={0.05}><img src="images/studio-interior.webp" alt="Светъл бутиков интериор" fetchPriority="high" /><div><BrandMark /><p className="signature">Good skin<br />brighter you</p></div></Reveal>
        <Reveal className="about-hero__portrait image-frame" variant="imageMask" direction="left" amount={0.12} delay={0.12}><img src="images/hero-beauty.webp" alt="Портрет с естествено сияйна кожа" fetchPriority="high" /><span>A HEALTHIER<br />HAPPIER YOU</span></Reveal>
        <Reveal className="about-hero__values" variant="fadeIn" delay={0.18} amount={0.2}>{values.slice(0, 3).map(({ icon: Icon, title }) => <span key={title}><Icon size={21} />{title}</span>)}</Reveal>
      </section>

      <section className="about-story">
        <Reveal className="about-story__texture image-frame" variant="imageMask" direction="left" amount={0.18}><img src="images/serum-texture.webp" alt="Сияйна козметична текстура" loading="lazy" /><span>BEAUTY<br />IS A FORM OF<br />SELF CARE</span></Reveal>
        <div className="about-story__copy">
          <Reveal><span className="eyebrow">{aboutCopy.story.eyebrow}</span><h2>{aboutCopy.story.title}</h2></Reveal>
          <div>{aboutCopy.story.paragraphs.map((paragraph, index) => <Reveal as="p" variant="fadeUp" delay={0.08 + index * 0.07} key={paragraph}>{paragraph}</Reveal>)}</div>
        </div>
        <Reveal className="about-story__flower image-frame" variant="imageMask" direction="right" amount={0.18} delay={0.12}><img src="images/flowers-detail.webp" alt="Бели цветя в топъл интериор" loading="lazy" /></Reveal>
      </section>

      <section className="about-approach">
        <div className="about-approach__copy">
          <Reveal variant="headingReveal"><span className="eyebrow">{aboutCopy.approach.eyebrow}</span><h2>{aboutCopy.approach.title}</h2></Reveal>
          <Reveal as="p" variant="fadeUp" delay={0.08}>{aboutCopy.approach.body}</Reveal>
          <div className="about-values">{values.map(({ icon: Icon, title, text }, index) => <Reveal variant="fadeUp" delay={index * 0.075} amount={0.18} key={title}><Icon size={28} strokeWidth={1.25} /><strong>{title}</strong><span>{text}</span></Reveal>)}</div>
          <Reveal as="p" className="signature" variant="fadeIn" delay={0.18}>More than beauty</Reveal>
        </div>
        <Reveal className="about-approach__image image-frame" variant="imageMask" direction="right" amount={0.18}><img src="images/professional-treatment.webp" alt="Професионална козметична грижа за клиент" loading="lazy" /><span>HEALTHY SKIN<br />CONFIDENT YOU</span></Reveal>
      </section>

      <section className="about-booking">
        <Reveal className="about-booking__intro" variant="headingReveal" amount={0.18}><span className="eyebrow">ЗАПАЗИ СВОЯ ЧАС</span><h2>Погрижи се за себе си днес</h2><p>Избери процедура, удобна дата и час. Нашият екип ще се свърже с теб за потвърждение.</p></Reveal>
        <Reveal className="about-booking__form" variant="fadeUp" delay={0.08} amount={0.15}><BookingForm compact /></Reveal>
        <Reveal className="about-booking__contact" variant="revealRight" delay={0.16} amount={0.18}>
          <h3>Свържи се с нас</h3>
          <a href={`tel:${site.phoneHref}`}><Phone size={20} />{site.phone}</a>
          <a href={site.instagram.url} target="_blank" rel="noreferrer"><Instagram size={20} />{site.instagram.handle}</a>
          <a href={`mailto:${site.email}`}><Mail size={20} />{site.email}</a>
          <span><MapPin size={20} />{site.address.join(', ')}</span>
        </Reveal>
      </section>

      <section className="about-reviews section">
        <div className="container">
          <Reveal className="about-reviews__heading" variant="headingReveal" amount={0.2}><div><span className="eyebrow">ИСТИНСКИ ИСТОРИИ · ЛИЧНО ДОВЕРИЕ</span><h2>Какво казват нашите клиенти</h2></div><ArrowLink to="/reviews" variant="text">Всички отзиви</ArrowLink></Reveal>
          <div className="about-reviews__grid">{reviews.slice(0, 3).map((review, index) => <Reveal as="blockquote" variant="fadeUp" delay={index * 0.08} amount={0.18} key={review.id}><span>“</span><p>{review.quote}</p><footer><strong>{review.name}</strong><small>{review.treatment}</small></footer></Reveal>)}</div>
        </div>
      </section>

      <section className="about-location">
        <Reveal className="about-location__copy" variant="revealLeft" amount={0.18}><span className="eyebrow">ЛЕСНО ДА НИ ОТКРИЕТЕ</span><h2>В сърцето на София</h2><p>Спокойно пространство, създадено за твоето време за грижа.</p><strong>{site.address.join(', ')}</strong><ArrowLink to="/contact">Запази час</ArrowLink></Reveal>
        <Reveal className="about-location__visual" variant="fadeIn" delay={0.08} amount={0.2}><div className="about-location__map" aria-hidden="true"><span>НДК</span><i /><BrandMark /></div></Reveal>
        <Reveal className="about-location__image image-frame" variant="imageMask" direction="right" amount={0.18} delay={0.14}><img src="images/studio-interior.webp" alt="Интериор на козметичното студио" loading="lazy" /></Reveal>
      </section>
    </div>
  )
}
