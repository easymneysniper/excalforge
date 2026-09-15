import { expect, it } from 'vitest'
import { validateBooking } from './validateBooking'

it('requires name and a plausible phone number', () => {
  expect(validateBooking({ name: '', phone: '12', email: '' })).toMatchObject({
    name: expect.any(String),
    phone: expect.any(String),
  })
})

it('validates an optional email only when supplied', () => {
  expect(validateBooking({ name: 'Мария', phone: '+359888123456', email: 'bad' })).toHaveProperty('email')
  expect(validateBooking({ name: 'Мария', phone: '+359888123456', email: '' })).not.toHaveProperty('email')
})
