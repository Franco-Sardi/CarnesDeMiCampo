import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { useOfertas } from '../hooks/useProductos'

const fmt = (n: number) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(n)

function Countdown() {
  const [t, setT] = useState({ d: 2, h: 15, m: 30, s: 0 })

  useEffect(() => {
    const iv = setInterval(() => {
      setT(p => {
        let { d, h, m, s } = p; s--
        if (s < 0) { s = 59; m-- }
        if (m < 0) { m = 59; h-- }
        if (h < 0) { h = 23; d-- }
        if (d < 0) return { d: 0, h: 0, m: 0, s: 0 }
        return { d, h, m, s }
      })
    }, 1000)
    return () => clearInterval(iv)
  }, [])

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <div className="flex items-center gap-2">
      {[{ v: t.d, l: 'D' }, { v: t.h, l: 'H' }, { v: t.m, l: 'M' }, { v: t.s, l: 'S' }].map((b, i) => (
        <div key={b.l} className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <span className="font-display text-2xl font-light italic tabular-nums text-cream sm:text-3xl">
              {pad(b.v)}
            </span>
            <span className="text-[8px] uppercase tracking-wider text-cream/30">{b.l}</span>
          </div>
          {i < 3 && <span className="mb-3 text-sm text-dorado/60">:</span>}
        </div>
      ))}
    </div>
  )
}

export default function Ofertas() {
  const { ofertas } = useOfertas()

  return (
    <section id="ofertas" className="bg-dark py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header row */}
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <div className="mb-4 h-[2px] w-12 bg-dorado" />
              <span className="text-[10px] font-medium uppercase tracking-[0.38em] text-dorado/70">
                Ofertas de la Semana
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-heading text-3xl font-bold text-cream sm:text-4xl"
            >
              Más rico,{' '}
              <span className="text-gradient-gold">más sano</span>
            </motion.h2>
          </div>

          {/* Countdown timer */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="border border-dark-border bg-dark-card px-6 py-4"
          >
            <p className="mb-3 text-[9px] uppercase tracking-[0.22em] text-dorado/40">Termina en</p>
            <Countdown />
          </motion.div>
        </div>

        {/* Offer cards grid */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ofertas.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: i * 0.1 }}
              className="group relative cursor-pointer overflow-hidden border border-dark-border bg-dark-card transition-colors duration-300 hover:border-dorado/40"
            >
              {/* Badge */}
              {p.badge && (
                <div className="absolute top-0 right-0 z-10 bg-dorado px-3 py-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wide text-dark">{p.badge}</span>
                </div>
              )}

              {/* Image */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={p.imagen}
                  alt={p.nombre}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-card/90 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="text-[9px] uppercase tracking-wider text-warm">{p.corte}</p>
                <h3 className="mt-1 font-heading text-lg font-bold text-cream transition-colors duration-200 group-hover:text-dorado-light">
                  {p.nombre}
                </h3>
                <div className="mt-3 flex items-baseline gap-3">
                  {p.precio_ant && (
                    <span className="font-display text-sm italic text-warm line-through">
                      {fmt(p.precio_ant)}
                    </span>
                  )}
                  <span className="font-display text-2xl font-light italic text-campo">
                    {fmt(p.precio)}
                  </span>
                </div>
              </div>

              {/* Gold underline sweep */}
              <div className="h-px w-0 bg-dorado/50 transition-all duration-[400ms] group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
