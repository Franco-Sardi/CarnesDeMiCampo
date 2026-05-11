import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { useProductos } from '../hooks/useProductos'

const fmt = (n: number) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(n)

function ProductSkeleton() {
  return (
    <div className="animate-pulse border border-dark-border bg-dark-card">
      <div className="aspect-square bg-dark-soft" />
      <div className="space-y-2 p-4">
        <div className="h-2 w-1/3 rounded bg-dark-soft" />
        <div className="h-3 w-2/3 rounded bg-dark-soft" />
        <div className="h-4 w-1/2 rounded bg-dark-soft" />
      </div>
    </div>
  )
}

export default function Productos() {
  const { productos, loading } = useProductos()
  const featured = productos.slice(0, 4)

  return (
    <section id="productos" className="bg-dark py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="mb-3 h-[2px] w-10 bg-dorado" />
              <span className="text-[10px] font-medium uppercase tracking-[0.38em] text-dorado/70">
                Nuestros Cortes
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mt-2 font-heading text-3xl font-bold text-cream sm:text-4xl"
            >
              Selección <span className="text-gradient-gold">destacada</span>
            </motion.h2>
          </div>

          <Link
            to="/productos"
            className="hidden items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-cream/40 transition-colors hover:text-dorado sm:flex"
          >
            Ver todos
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* 4 featured cards — 2 cols mobile, 4 desktop */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <ProductSkeleton key={i} />)
            : featured.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.07 }}
                className="group cursor-pointer border border-dark-border bg-dark-card transition-colors duration-300 hover:border-dorado/40"
              >
                <Link to={`/producto/${p.id}`} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={p.imagen}
                      alt={p.nombre}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-card/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    {p.badge && (
                      <span className="absolute left-2.5 top-2.5 bg-dorado px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-dark">
                        {p.badge}
                      </span>
                    )}
                    <div className="absolute inset-x-0 bottom-0 flex translate-y-2 items-center justify-center pb-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <span className="bg-dark/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-cream backdrop-blur-sm">
                        Ver corte →
                      </span>
                    </div>
                  </div>
                  <div className="p-3.5">
                    <p className="text-[9px] uppercase tracking-wider text-warm/70">{p.corte}</p>
                    <h3 className="mt-0.5 font-heading text-sm font-bold leading-tight text-cream transition-colors duration-200 group-hover:text-dorado-light">
                      {p.nombre}
                    </h3>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-display text-base italic text-cream/80">
                        {fmt(p.precio)}
                      </span>
                      {p.precio_ant && (
                        <span className="text-[10px] text-warm/50 line-through">
                          {fmt(p.precio_ant)}
                        </span>
                      )}
                    </div>
                    <div className="mt-2.5 h-px w-0 bg-dorado/50 transition-all duration-300 group-hover:w-full" />
                  </div>
                </Link>
              </motion.div>
            ))
          }
        </div>

        {/* CTA al catálogo */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 text-center"
        >
          <Link
            to="/productos"
            className="group inline-flex cursor-pointer items-center gap-3 border border-dorado/30 px-7 py-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-cream/55 transition-all duration-300 hover:border-dorado hover:text-cream"
          >
            <span className="absolute inset-0 -translate-x-full bg-dorado/8 transition-transform duration-500 group-hover:translate-x-0" />
            <span className="relative">Ver catálogo completo</span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="relative transition-transform group-hover:translate-x-1">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
