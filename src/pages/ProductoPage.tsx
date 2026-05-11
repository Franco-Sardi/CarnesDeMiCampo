import { useParams, Link } from 'react-router-dom'
import { motion } from 'motion/react'
import CowDiagram from '../components/CowDiagram'
import { useProducto, useProductos } from '../hooks/useProductos'
import BotonAgregarCarrito from '../components/BotonAgregarCarrito'

const fmt = (n: number) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(n)

export default function ProductoPage() {
  const { id } = useParams()
  const { producto, loading, error } = useProducto(Number(id))
  const { productos } = useProductos()

  if (loading) return (
    <div className="flex min-h-screen items-center justify-center bg-dark">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-dorado border-t-transparent" />
    </div>
  )

  if (!producto || error) return (
    <div className="flex min-h-screen items-center justify-center bg-dark">
      <div className="text-center">
        <h1 className="font-heading text-3xl text-cream">Producto no encontrado</h1>
        <Link to="/" className="mt-4 inline-block text-sm text-campo hover:text-campo-light">← Volver</Link>
      </div>
    </div>
  )

  const related = productos.filter(p => p.id !== producto.id).slice(0, 3)
  const waUrl = `https://wa.me/5492612342674?text=${encodeURIComponent(`Hola! Quiero consultar sobre ${producto.nombre}`)}`

  return (
    <div className="min-h-screen bg-dark pt-20">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-5 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs text-cream/30">
          <Link to="/" className="transition-colors hover:text-cream">Inicio</Link>
          <span>/</span>
          <Link to="/#productos" className="transition-colors hover:text-cream">Productos</Link>
          <span>/</span>
          <span className="text-cream/60">{producto.nombre}</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">

          {/* LEFT: Image + Cow Diagram */}
          <div>
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[4/3] overflow-hidden">
              <img src={producto.imagen} alt={producto.nombre} className="h-full w-full object-cover" />
              {producto.badge && (
                <span className="absolute left-4 top-4 bg-dorado px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-dark">
                  {producto.badge}
                </span>
              )}
            </motion.div>

            {producto.cut_id && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-6 border border-dark-border bg-dark-card p-5">
                <div className="mb-3 flex items-center gap-3">
                  <div className="h-px w-8 bg-dorado" />
                  <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-dorado/70">
                    Ubicación del corte
                  </span>
                </div>
                <CowDiagram activeCut={producto.cut_id} interactive={false} />
                {producto.ubicacion && (
                  <p className="mt-3 hidden text-[10px] leading-relaxed italic text-cream/35 sm:block">
                    {producto.ubicacion}
                  </p>
                )}
              </motion.div>
            )}
          </div>

          {/* RIGHT: Product Details */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}>

            <div className="mb-3 flex items-center gap-3">
              <div className="h-px w-10 bg-dorado" />
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-dorado/70">{producto.corte}</span>
            </div>
            <h1 className="font-heading text-3xl font-bold text-cream sm:text-4xl lg:text-5xl">
              {producto.nombre}
            </h1>

            {producto.nombres_alt?.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {producto.nombres_alt.map(n => (
                  <span key={n} className="border border-dark-border px-2 py-0.5 text-[9px] uppercase tracking-wider text-cream/35">
                    {n}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-5 flex items-baseline gap-3">
              <span className="font-heading text-3xl font-bold text-campo">{fmt(producto.precio)}</span>
              {producto.precio_ant && (
                <span className="text-sm text-warm/50 line-through">{fmt(producto.precio_ant)}</span>
              )}
              <span className="text-xs text-cream/30">por kg</span>
            </div>

            <div className="mt-4 h-px w-full bg-dark-border" />

            <p className="mt-5 text-sm leading-relaxed text-cream/60">{producto.descripcion}</p>

            {producto.metodos?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {producto.metodos.map(m => (
                  <span key={m} className="border border-campo/25 bg-campo/5 px-3 py-1 text-[9px] font-semibold uppercase tracking-wider text-campo/80">
                    {m}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-6 divide-y divide-dark-border border border-dark-border">
              {producto.pedido && (
                <div className="p-4 sm:p-5">
                  <p className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-dorado/70">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/></svg>
                    Cómo pedirlo
                  </p>
                  <p className="text-sm leading-relaxed text-cream/55">{producto.pedido}</p>
                </div>
              )}
              {producto.coccion && (
                <div className="p-4 sm:p-5">
                  <p className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-dorado/70">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M4.93 4.93l2.83 2.83M2 12h4M4.93 19.07l2.83-2.83M12 18v4M19.07 19.07l-2.83-2.83M22 12h-4M19.07 4.93l-2.83 2.83"/></svg>
                    Cocción recomendada
                  </p>
                  <p className="text-sm leading-relaxed text-cream/55">{producto.coccion}</p>
                </div>
              )}
              {producto.ideal_para && (
                <div className="p-4 sm:p-5">
                  <p className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-dorado/70">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    Ideal para
                  </p>
                  <p className="text-sm leading-relaxed text-cream/55">{producto.ideal_para}</p>
                </div>
              )}
            </div>

            {producto.pro_tip && (
              <div className="mt-4 border-l-2 border-dorado/40 bg-dorado/5 px-4 py-3 sm:px-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-dorado/70">Pro tip del asador</p>
                <p className="mt-1.5 text-sm leading-relaxed text-cream/60">{producto.pro_tip}</p>
              </div>
            )}

            <div className="mt-6 flex flex-col gap-3">
              <BotonAgregarCarrito producto={producto} />

              <div className="flex flex-col gap-2 sm:flex-row">
                <a href={waUrl} target="_blank" rel="noopener noreferrer"
                  className="flex flex-1 cursor-pointer items-center justify-center gap-2 border border-dark-border px-6 py-3 text-[11px] font-semibold uppercase tracking-wider text-cream/55 transition-all hover:border-cream/30 hover:text-cream">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.875 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Consultar por WhatsApp
                </a>
                <Link to="/productos"
                  className="flex cursor-pointer items-center justify-center border border-dark-border px-6 py-3 text-[11px] font-semibold uppercase tracking-wider text-cream/55 transition-all hover:border-cream/30 hover:text-cream">
                  Ver todos los cortes
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-16 border-t border-dark-border pt-10">
            <h3 className="font-heading text-xl font-bold text-cream">Otros cortes</h3>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {related.map(p => (
                <Link key={p.id} to={`/producto/${p.id}`}
                  className="group flex gap-4 border border-dark-border bg-dark-card p-3 transition-colors hover:border-dorado/30">
                  <img src={p.imagen} alt={p.nombre} className="h-20 w-20 object-cover" />
                  <div className="flex flex-col justify-center">
                    <h4 className="font-heading text-sm font-bold text-cream transition-colors group-hover:text-dorado-light">{p.nombre}</h4>
                    <p className="text-[10px] text-warm">{p.corte}</p>
                    <p className="mt-1 text-sm font-medium text-campo">{fmt(p.precio)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
