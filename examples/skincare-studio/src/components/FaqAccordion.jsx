import { AnimatePresence, motion } from 'motion/react'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import Reveal from './Reveal'

export default function FaqAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(-1)
  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const isOpen = index === openIndex
        const panelId = `faq-panel-${index}`
        return (
          <Reveal as="div" className={`faq-item${isOpen ? ' faq-item--open' : ''}`} variant="fadeUp" delay={(index % 5) * 0.07} amount={0.15} key={item.question}>
            <button type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpenIndex(isOpen ? -1 : index)}>
              <span>{item.question}</span><Plus aria-hidden="true" size={22} strokeWidth={1.3} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div id={panelId} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}>
                  <p>{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </Reveal>
        )
      })}
    </div>
  )
}
