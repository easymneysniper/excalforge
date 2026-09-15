import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { expect, it } from 'vitest'
import FaqAccordion from './FaqAccordion'

it('reveals an answer and updates the expanded state', async () => {
  render(<FaqAccordion items={[{ question: 'Въпрос', answer: 'Отговор' }]} />)
  const trigger = screen.getByRole('button', { name: 'Въпрос' })
  fireEvent.click(trigger)
  expect(trigger).toHaveAttribute('aria-expanded', 'true')
  await waitFor(() => expect(screen.getByText('Отговор')).toBeVisible())
})
