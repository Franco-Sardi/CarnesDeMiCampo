import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { ofertas } from '../data/productos'

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
            <span className="font-heading text-xl font-bold tabular-nums text-cream sm:text-2xl">{pad(b.v)}</span>
            <span className="text-[8px] uppercase tracking-wider text-cream/30">{b.l}</span>
          </div>
          {i < 3 && <span className="mb-3 text-sm text-campo">:</span>}
        </div>
      ))}
    </div>
  )
}

export default function Ofertas() {
  return (
    <section id="ofertas" className="bg-dark py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="mb-3 flex items-center gap-3">
              <div className="h-px w-10 bg-campo" />
              <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-campo">Ofertas</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="font-heading text-3xl font-bold text-cream sm:text-4xl">
              Más rico, <span className="text-campo">más sano</span>
            </motion.h2>
          </div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="border border-dark-border bg-dark-card p-4">
            <p className="mb-2 text-[9px] uppercase tracking-[0.2em] text-cream/30">Termina en</p>
            <Countdown />
          </motion.div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ofertas.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group overflow-hidden border border-dark-border bg-dark-card transition-colors hover:border-campo/30">
              {p.badge && (
                <div className="absolute top-0 right-0 z-10 bg-campo px-3 py-1.5">
                  <span className="text-xs font-bold text-cream">{p.badge}</span>
                </div>
              )}
              <div className="relative aspect-[16/9] overflow-hidden">
                <img src={p.imagen} alt={p.nombre}
                  className="h-full w-full object-cover transition-transform duration-600 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent" />
              </div>
              <div className="p-5">
                <p className="text-[9px] uppercase tracking-wider text-warm">{p.corte}</p>
                <h3 className="mt-1 font-heading text-lg font-bold text-cream">{p.nombre}</h3>
                <div className="mt-3 flex items-baseline gap-2">
                  {p.precioAnterior && <span className="text-sm text-warm line-through">{fmt(p.precioAnterior)}</span>}
                  <span className="text-xl font-bold text-campo">{fmt(p.precio)}</span>
                </div>
              </div>
              <div className="h-px w-0 bg-campo transition-all duration-400 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
