import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { expect, it } from 'vitest'
import Home from './Home'

it('renders the reference-led Home sequence as separate sections', () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  )
  expect(screen.getByRole('heading', { level: 1, name: /бутикова грижа/i })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: /професионална грижа/i })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: /за нас/i })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: /реални резултати/i })).toBeInTheDocument()
})

it('preserves the editorial grid placement hooks around the procedures heading', () => {
  const { container } = render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  )

  expect(container.querySelector('.home-procedures__head .section-intro > :first-child')).toHaveClass('reveal-clip')
})
