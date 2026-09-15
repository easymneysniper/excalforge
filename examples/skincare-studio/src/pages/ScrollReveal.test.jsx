import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { expect, it } from 'vitest'
import About from './About'
import Contact from './Contact'
import Gallery from './Gallery'
import Home from './Home'
import Procedures from './Procedures'
import Reviews from './Reviews'

const routeRevealCases = [
  ['home', <Home />, '.home-about__image[data-reveal="imageMask"]'],
  ['procedures', <Procedures />, '.featured-treatment__image[data-reveal="imageMask"]'],
  ['about', <About />, '.about-approach__image[data-reveal="imageMask"]'],
  ['gallery', <Gallery />, '.gallery-quote__copy[data-reveal="headingReveal"]'],
  ['reviews', <Reviews />, '.reviews-philosophy__image[data-reveal="imageMask"]'],
  ['contact', <Contact />, '.contact-main__form[data-reveal="fadeUp"]'],
]

it.each(routeRevealCases)('gives the %s route an art-directed reveal sequence beyond its hero', (_, page, selector) => {
  const { container } = render(<MemoryRouter>{page}</MemoryRouter>)

  expect(container.querySelector(selector)).toBeInTheDocument()
})
