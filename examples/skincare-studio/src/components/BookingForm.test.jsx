import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import BookingForm from './BookingForm'

it('shows the local presentation confirmation after valid input', async () => {
  render(<BookingForm />)
  fireEvent.change(screen.getByLabelText(/^име \*$/i), { target: { value: 'Мария' } })
  fireEvent.change(screen.getByLabelText(/^телефон/i), { target: { value: '+359888123456' } })
  fireEvent.click(screen.getByRole('button', { name: /запази час/i }))
  expect(await screen.findByText('Благодарим! Това е демонстрационна форма.')).toBeInTheDocument()
})

it('shows inline feedback without submitting invalid input', () => {
  render(<BookingForm />)
  fireEvent.click(screen.getByRole('button', { name: /запази час/i }))
  expect(screen.getByText('Моля, въведи своето име.')).toBeInTheDocument()
  expect(screen.getByText('Моля, въведи валиден телефон.')).toBeInTheDocument()
})
