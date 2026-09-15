export function validateBooking(values) {
  const errors = {}
  if (!values.name?.trim()) errors.name = 'Моля, въведи своето име.'
  const phoneDigits = (values.phone ?? '').replace(/\D/g, '')
  if (phoneDigits.length < 7) errors.phone = 'Моля, въведи валиден телефон.'
  if (values.email?.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Моля, въведи валиден имейл.'
  }
  return errors
}
