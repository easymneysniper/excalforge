import { motion } from 'motion/react'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { useEffect, useRef } from 'react'

export default function Lightbox({ items, activeIndex, onChange, onClose }) {
  const closeRef = useRef(null)
  const item = items[activeIndex]

  useEffect(() => {
    const previousFocus = document.activeElement
    document.body.classList.add('lightbox-open')
    closeRef.current?.focus()
    const keyHandler = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') onChange((activeIndex + 1) % items.length)
      if (event.key === 'ArrowLeft') onChange((activeIndex - 1 + items.length) % items.length)
    }
    document.addEventListener('keydown', keyHandler)
    return () => {
      document.removeEventListener('keydown', keyHandler)
      document.body.classList.remove('lightbox-open')
      previousFocus?.focus?.()
    }
  }, [activeIndex, items.length, onChange, onClose])

  return (
    <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label="Галерия" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <button ref={closeRef} className="lightbox__close" type="button" onClick={onClose} aria-label="Затвори галерията"><X size={25} /></button>
      <button className="lightbox__nav lightbox__nav--prev" type="button" onClick={() => onChange((activeIndex - 1 + items.length) % items.length)} aria-label="Предишна снимка"><ArrowLeft /></button>
      <motion.figure key={item.id ?? item.src} initial={{ opacity: 0, scale: .985 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .42 }}>
        <img src={item.src} alt={item.alt} />
        {item.caption && <figcaption><span>{String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span><p>{item.caption}</p></figcaption>}
      </motion.figure>
      <button className="lightbox__nav lightbox__nav--next" type="button" onClick={() => onChange((activeIndex + 1) % items.length)} aria-label="Следваща снимка"><ArrowRight /></button>
    </motion.div>
  )
}
