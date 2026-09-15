import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { expect, it } from 'vitest'
import Header from './Header'

it('opens and closes the full-screen navigation', async () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
  )

  fireEvent.click(screen.getByRole('button', { name: /отвори меню/i }))
  expect(screen.getByRole('dialog', { name: /навигация/i })).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: /затвори меню/i }))
  await waitForElementToBeRemoved(() => screen.queryByRole('dialog', { name: /навигация/i }))
})

it('closes the mobile navigation with Escape and restores focus', async () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
  )

  const opener = screen.getByRole('button', { name: /отвори меню/i })
  opener.focus()
  fireEvent.click(opener)
  fireEvent.keyDown(document, { key: 'Escape' })

  await waitForElementToBeRemoved(() => screen.queryByRole('dialog', { name: /навигация/i }))
  expect(opener).toHaveFocus()
})
