import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CalendarDays, Instagram, Menu, X } from 'lucide-react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { navItems, site } from '../content/site'
import BrandMark from './BrandMark'
import './shared.css'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const menuRef = useRef(null)
  const closeRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const update = () => setIsScrolled(window.scrollY > 28)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.classList.toggle('menu-open', isOpen)
    return () => document.body.classList.remove('menu-open')
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return undefined

    const previousFocus = document.activeElement
    const keyHandler = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        return
      }
      if (event.key !== 'Tab') return

      const focusable = [...menuRef.current.querySelectorAll('a[href], button:not([disabled])')]
      const first = focusable[0]
      const last = focusable.at(-1)
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }

    closeRef.current?.focus()
    document.addEventListener('keydown', keyHandler)
    return () => {
      document.removeEventListener('keydown', keyHandler)
      previousFocus?.focus?.()
    }
  }, [isOpen])

  return (
    <>
      <a className="skip-link" href="#main-content">Към съдържанието</a>
      <header className={`site-header${isScrolled ? ' site-header--scrolled' : ''}`}>
        <div className="site-header__inner">
          <Link to="/" className="site-header__brand" aria-label="Начало">
            <BrandMark compact={isScrolled} />
          </Link>

          <nav className="desktop-nav" aria-label="Основна навигация">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="site-header__actions">
            <a className="icon-link desktop-only" href={site.instagram.url} target="_blank" rel="noreferrer" aria-label="Instagram">
              <Instagram size={21} strokeWidth={1.5} />
            </a>
            <Link className="booking-button desktop-only" to="/contact">
              <CalendarDays size={17} strokeWidth={1.6} />
              <span>Запази час</span>
            </Link>
            <button className="menu-toggle" type="button" onClick={() => setIsOpen(true)} aria-label="Отвори меню" aria-expanded={isOpen} aria-controls="mobile-navigation">
              <Menu size={27} strokeWidth={1.4} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-navigation"
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Мобилна навигация"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.65, ease: [0.77, 0, 0.18, 1] }}
          >
            <div className="mobile-menu__top">
              <BrandMark />
              <button ref={closeRef} type="button" className="menu-toggle" onClick={() => setIsOpen(false)} aria-label="Затвори меню">
                <X size={28} strokeWidth={1.3} />
              </button>
            </div>
            <nav className="mobile-nav" aria-label="Навигация">
              {navItems.map((item, index) => (
                <motion.div key={item.to} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 + index * 0.055 }}>
                  <NavLink to={item.to} end={item.to === '/'} onClick={() => setIsOpen(false)}>
                    <span>0{index + 1}</span>{item.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <div className="mobile-menu__footer">
              <a href={site.instagram.url} target="_blank" rel="noreferrer"><Instagram size={19} /> {site.instagram.handle}</a>
              <Link className="booking-button" to="/contact" onClick={() => setIsOpen(false)}><CalendarDays size={17} /> Запази час</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
