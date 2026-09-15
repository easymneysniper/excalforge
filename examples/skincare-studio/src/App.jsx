import { lazy, Suspense, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import BrandMark from './components/BrandMark'
import ScrollToTop from './components/ScrollToTop'

const Home = lazy(() => import('./pages/Home'))
const Procedures = lazy(() => import('./pages/Procedures'))
const About = lazy(() => import('./pages/About'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Reviews = lazy(() => import('./pages/Reviews'))
const Contact = lazy(() => import('./pages/Contact'))

function LoadingScreen() {
  return (
    <div className="loading-screen" role="status" aria-label="Зареждане">
      <BrandMark />
    </div>
  )
}

export default function App() {
  const location = useLocation()
  const isFirstRender = useRef(true)

  useEffect(() => {
    isFirstRender.current = false
  }, [])

  return (
    <div className="site-shell">
      <ScrollToTop />
      <Header />
      <Suspense fallback={<LoadingScreen />}>
        <AnimatePresence mode="wait">
          <motion.main
            id="main-content"
            key={location.pathname}
            initial={isFirstRender.current && location.pathname !== '/' ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/procedures" element={<Procedures />} />
              <Route path="/about" element={<About />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </motion.main>
        </AnimatePresence>
      </Suspense>
      <Footer />
    </div>
  )
}
