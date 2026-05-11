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
import Manifesto from './components/Manifesto'
import Ofertas from './components/Ofertas'
import Sucursales from './components/Sucursales'
import Contacto from './components/Contacto'
import Footer from './components/Footer'
import SucursalPage from './pages/SucursalPage'
import ProductoPage from './pages/ProductoPage'
import AdminLoginPage from './pages/AdminLoginPage'
import AdminPage from './pages/AdminPage'
import AdminProductoForm from './pages/AdminProductoForm'
import ProtectedRoute from './components/admin/ProtectedRoute'
import CatalogoPage from './pages/CatalogoPage'

function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Productos />
      <SobreNosotros />
      <Manifesto />
      <Ofertas />
      <Sucursales />
      <Contacto />
    </>
  )
}

function PublicSite() {
  return (
    <div className="grain min-h-screen bg-dark">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<CatalogoPage />} />
        <Route path="/sucursal/:id" element={<SucursalPage />} />
        <Route path="/producto/:id" element={<ProductoPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default function App() {
  const { pathname } = useLocation()
  const isAdmin = pathname.startsWith('/admin')

  if (isAdmin) {
    return (
      <Routes>
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
        <Route path="/admin/producto/nuevo" element={<ProtectedRoute><AdminProductoForm /></ProtectedRoute>} />
        <Route path="/admin/producto/:id/editar" element={<ProtectedRoute><AdminProductoForm /></ProtectedRoute>} />
      </Routes>
    )
  }

  return <PublicSite />
}
