import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, Check, RotateCcw } from 'lucide-react'
import { useState } from 'react'
import { procedures } from '../content/procedures'
import { validateBooking } from '../utils/validateBooking'

const initialValues = { name: '', phone: '', email: '', procedure: '', date: '', message: '' }

export default function BookingForm({ compact = false }) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const update = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validateBooking(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) setSubmitted(true)
  }

  const reset = () => {
    setValues(initialValues)
    setErrors({})
    setSubmitted(false)
  }

  return (
    <div className={`booking-form-wrap${compact ? ' booking-form-wrap--compact' : ''}`}>
      <AnimatePresence mode="wait" initial={false}>
        {submitted ? (
          <motion.div className="booking-success" key="success" role="status" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <span><Check size={28} strokeWidth={1.4} /></span>
            <p className="eyebrow">ЗАПИТВАНЕТО Е ГОТОВО</p>
            <h3>Благодарим! Това е демонстрационна форма.</h3>
            <p>При реалната версия тук ще получиш потвърждение и екипът ще се свърже с теб.</p>
            <button type="button" onClick={reset}><RotateCcw size={16} />Ново запитване</button>
          </motion.div>
        ) : (
          <motion.form className="booking-form" key="form" noValidate onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -12 }}>
            <div className="booking-form__field">
              <label htmlFor="booking-name">Име *</label>
              <input id="booking-name" name="name" value={values.name} onChange={update} autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'booking-name-error' : undefined} />
              {errors.name && <span className="field-error" id="booking-name-error">{errors.name}</span>}
            </div>
            <div className="booking-form__field">
              <label htmlFor="booking-phone">Телефон *</label>
              <input id="booking-phone" name="phone" type="tel" value={values.phone} onChange={update} autoComplete="tel" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'booking-phone-error' : undefined} />
              {errors.phone && <span className="field-error" id="booking-phone-error">{errors.phone}</span>}
            </div>
            <div className="booking-form__field">
              <label htmlFor="booking-email">Имейл</label>
              <input id="booking-email" name="email" type="email" value={values.email} onChange={update} autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'booking-email-error' : undefined} />
              {errors.email && <span className="field-error" id="booking-email-error">{errors.email}</span>}
            </div>
            <div className="booking-form__field">
              <label htmlFor="booking-procedure">Процедура</label>
              <select id="booking-procedure" name="procedure" value={values.procedure} onChange={update}>
                <option value="">Избери процедура</option>
                {procedures.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
              </select>
            </div>
            <div className="booking-form__field">
              <label htmlFor="booking-date">Предпочитана дата</label>
              <input id="booking-date" name="date" type="date" value={values.date} onChange={update} />
            </div>
            <div className="booking-form__field booking-form__field--wide">
              <label htmlFor="booking-message">Съобщение</label>
              <textarea id="booking-message" name="message" rows={compact ? 3 : 4} value={values.message} onChange={update} />
            </div>
            <button className="booking-form__submit" type="submit"><span>Запази час</span><ArrowRight size={19} strokeWidth={1.4} /></button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
