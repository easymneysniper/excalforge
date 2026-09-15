import { render, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { expect, it } from 'vitest'
import App from './App'

it('starts the page entrance animation when the site initially opens on the home route', async () => {
  const { container } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  )

  await waitFor(() => {
    expect(container.querySelector('#main-content')).toHaveStyle({ opacity: '0' })
  })
})

it('keeps a directly opened inner route visible while preserving its scroll-reveal starting states', async () => {
  const { container } = render(
    <MemoryRouter initialEntries={['/contact']}>
      <App />
    </MemoryRouter>,
  )

  await waitFor(() => {
    expect(container.querySelector('.contact-main__form')).toBeInTheDocument()
  })

  expect(container.querySelector('#main-content')).toHaveStyle({ opacity: '1' })
  expect(container.querySelector('.contact-main__form')).toHaveStyle({ opacity: '0' })
})
