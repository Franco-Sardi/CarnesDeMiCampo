import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import logo from '../assets/logo-web_Mesa-de-trabajo-1-1024x983.png'
import { useCarrito } from '../hooks/useCarrito'
import CarritoDrawer from './CarritoDrawer'

const links = [
  { label: 'Inicio',     section: 'inicio'     },
  { label: 'Productos',  href: '/productos'     },
  { label: 'Nosotros',   section: 'nosotros'   },
  { label: 'Ofertas',    section: 'ofertas'     },
  { label: 'Sucursales', section: 'sucursales'  },
  { label: 'Contacto',   section: 'contacto'   },
]

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const { cantidadItems } = useCarrito()
  const navigate = useNavigate()
  const location = useLocation()

  function handleNav(link: typeof links[0]) {
    setOpen(false)
    if (link.href) {
      navigate(link.href)
      return
    }
    if (location.pathname === '/') {
      scrollToSection(link.section!)
    } else {
      navigate(`/#${link.section}`)
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
          scrolled
            ? 'border-b border-dark-border bg-dark/95 shadow-2xl backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link to="/" className="cursor-pointer">
            <img src={logo} alt="Carnes de mi Campo" className="h-12 w-auto sm:h-14" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <button
                key={l.label}
                onClick={() => handleNav(l)}
                className="group relative cursor-pointer text-[11px] font-medium uppercase tracking-[0.14em] text-cream/55 transition-colors duration-200 hover:text-cream"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-dorado transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
            <CartButton count={cantidadItems} onClick={() => setCartOpen(true)} />
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-4 lg:hidden">
            <CartButton count={cantidadItems} onClick={() => setCartOpen(true)} />

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(!open)}
              aria-label="Menú"
              className="relative z-50 h-7 w-7 cursor-pointer"
            >
            <motion.span
              animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
              className="absolute left-0 top-1/2 h-[1.5px] w-full bg-cream"
              style={{ transformOrigin: 'center' }}
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              className="absolute left-0 top-1/2 h-[1.5px] w-full bg-cream"
            />
              <motion.span
                animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
                className="absolute left-0 top-1/2 h-[1.5px] w-full bg-cream"
                style={{ transformOrigin: 'center' }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 95% 3%)' }}
            animate={{ clipPath: 'circle(150% at 95% 3%)' }}
            exit={{ clipPath: 'circle(0% at 95% 3%)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-dark-soft"
          >
            {/* Gold divider */}
            <div className="mb-2 h-[1px] w-12 bg-dorado/60" />
            {links.map((l, i) => (
              <motion.button
                key={l.label}
                onClick={() => handleNav(l)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.05 }}
                className="cursor-pointer font-display text-4xl font-light italic text-cream/70 transition-colors hover:text-dorado"
              >
                {l.label}
              </motion.button>
            ))}
            <div className="mt-2 h-[1px] w-12 bg-dorado/60" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart drawer */}
      <CarritoDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}

function CartButton({ count, onClick }: { count: number; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Abrir carrito"
      className="relative cursor-pointer text-cream/55 transition-colors hover:text-cream"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
      </svg>
      {count > 0 && (
        <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-dorado px-1 text-[9px] font-bold text-dark">
          {count}
        </span>
      )}
    </button>
  )
}
