import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      let attempts = 0
      const tryScroll = () => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
          window.history.replaceState(null, '', '/')
        } else if (attempts++ < 20) {
          setTimeout(tryScroll, 80)
        }
      }
      setTimeout(tryScroll, 50)
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
  return null
}
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Productos from './components/Productos'
import SobreNosotros from './components/SobreNosotros'
import Ofertas from './components/Ofertas'
import Sucursales from './components/Sucursales'
import Contacto from './components/Contacto'
import Footer from './components/Footer'
import SucursalPage from './pages/SucursalPage'
import ProductoPage from './pages/ProductoPage'

function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Productos />
      <SobreNosotros />
      <Ofertas />
      <Sucursales />
      <Contacto />
    </>
  )
}

export default function App() {
  return (
    <div className="grain min-h-screen bg-dark">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sucursal/:id" element={<SucursalPage />} />
        <Route path="/producto/:id" element={<ProductoPage />} />
      </Routes>
      <Footer />
    </div>
  )
}
