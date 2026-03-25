import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import logo from '../assets/logo-web_Mesa-de-trabajo-1-1024x983.png'

const links = [
  { section: 'inicio', label: 'Inicio' },
  { section: 'productos', label: 'Productos' },
  { section: 'nosotros', label: 'Nosotros' },
  { section: 'ofertas', label: 'Ofertas' },
  { section: 'sucursales', label: 'Sucursales' },
  { section: 'contacto', label: 'Contacto' },
]

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  function handleNav(section: string) {
    setOpen(false)
    if (location.pathname === '/') {
      scrollToSection(section)
    } else {
      navigate(`/#${section}`)
    }
  }

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
          scrolled ? 'bg-dark/90 shadow-xl backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <Link to="/">
            <img src={logo} alt="Carnes de mi Campo" className="h-12 w-auto sm:h-14" />
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <button key={l.section} onClick={() => handleNav(l.section)}
                className="group relative text-[12px] font-medium uppercase tracking-[0.12em] text-cream/60 transition-colors hover:text-cream">
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-campo transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          <button onClick={() => setOpen(!open)} aria-label="Menú" className="relative z-50 h-7 w-7 lg:hidden">
            <motion.span animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
              className="absolute left-0 top-1/2 h-[1.5px] w-full bg-cream" style={{ transformOrigin: 'center' }} />
            <motion.span animate={open ? { opacity: 0 } : { opacity: 1 }}
              className="absolute left-0 top-1/2 h-[1.5px] w-full bg-cream" />
            <motion.span animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
              className="absolute left-0 top-1/2 h-[1.5px] w-full bg-cream" style={{ transformOrigin: 'center' }} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 95% 3%)' }}
            animate={{ clipPath: 'circle(150% at 95% 3%)' }}
            exit={{ clipPath: 'circle(0% at 95% 3%)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-dark-soft"
          >
            {links.map((l, i) => (
              <motion.button key={l.section} onClick={() => handleNav(l.section)}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.05 }}
                className="font-heading text-3xl font-bold text-cream/70 hover:text-campo">
                {l.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
