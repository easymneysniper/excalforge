import { render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import Reveal from './Reveal'

const originalIntersectionObserver = global.IntersectionObserver

afterEach(() => {
  global.IntersectionObserver = originalIntersectionObserver
})

it('keeps a directional reveal in its restrained starting state until it enters the viewport', () => {
  global.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  render(
    <Reveal variant="revealRight">
      <p>Editorial copy</p>
    </Reveal>,
  )

  const reveal = screen.getByText('Editorial copy').parentElement
  expect(reveal).toHaveStyle({ opacity: '0', transform: 'translateX(24px)' })
})
