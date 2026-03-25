import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { productos } from '../data/productos'

const fmt = (n: number) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(n)

export default function Productos() {
  return (
    <section id="productos" className="bg-dark py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} className="mb-3 flex items-center gap-3">
          <div className="h-px w-10 bg-campo" />
          <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-campo">Nuestros Cortes</span>
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="mb-10 font-heading text-3xl font-bold text-cream sm:text-4xl lg:text-5xl">
          Productos que deleitan<br />
          <span className="text-gradient-green">tus sentidos</span>
        </motion.h2>
      </div>

      {/* Horizontal scroll */}
      <div className="pl-5 sm:pl-6 lg:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]">
        <div className="h-scroll">
          {productos.map((p, i) => (
            <motion.div key={p.id}
              initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group w-[260px] sm:w-[280px]">
              <Link to={`/producto/${p.id}`} className="block">
                {/* Image — compact */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img src={p.imagen} alt={p.nombre}
                    className="h-full w-full object-cover transition-transform duration-600 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/10 to-transparent opacity-50 transition-opacity group-hover:opacity-70" />
                  {p.badge && (
                    <span className="absolute top-3 left-3 bg-campo/90 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-cream">
                      {p.badge}
                    </span>
                  )}
                  {/* Hover description */}
                  <div className="absolute inset-x-0 bottom-0 translate-y-2 px-4 pb-4 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-xs leading-relaxed text-cream/80">{p.descripcion}</p>
                  </div>
                </div>
                {/* Info — always visible */}
                <div className="mt-3 flex items-end justify-between">
                  <div>
                    <h3 className="font-heading text-base font-bold text-cream group-hover:text-campo transition-colors">{p.nombre}</h3>
                    <p className="text-[10px] uppercase tracking-wider text-warm">{p.corte}</p>
                  </div>
                  <span className="text-sm tabular-nums text-cream/50">{fmt(p.precio)}</span>
                </div>
                <div className="mt-2 h-px w-0 bg-campo transition-all duration-400 group-hover:w-full" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
