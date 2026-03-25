import { motion } from 'motion/react'

const stats = [
  { n: '2006', l: 'Fundación' },
  { n: '6', l: 'Sucursales' },
  { n: '100%', l: 'Integrados' },
]

const pilares = [
  {
    title: 'Del campo a tu mesa',
    desc: 'Controlamos cada etapa de la cadena: la cría, el proceso y la venta. Sin intermediarios. Eso se nota en cada corte.',
  },
  {
    title: 'Tradición mendocina',
    desc: 'Nacimos en Mendoza y crecimos con ella. Desde Dorrego hasta Chacras de Coria, somos parte del paisaje gastronómico provincial.',
  },
  {
    title: 'Más que una carnicería',
    desc: 'Nuestros espacios combinan carnicería, fiambrería y experiencia gourmet. Porque una buena carne merece un contexto a la altura.',
  },
]

export default function SobreNosotros() {
  return (
    <section id="nosotros" className="bg-campo-dark py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* Image side */}
          <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="relative">
            <div className="relative aspect-[4/3] overflow-hidden lg:aspect-[3/4]">
              <img
                src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&q=80"
                alt="Campos de Mendoza"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-campo-dark/60 to-transparent" />
            </div>

            {/* Stats row over image */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-around border-t border-cream/10 bg-dark/70 px-4 py-4 backdrop-blur-sm">
              {stats.map((s, i) => (
                <motion.div key={s.l} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: 0.4 + i * 0.1 }}
                  className="text-center">
                  <div className="font-heading text-2xl font-bold text-cream sm:text-3xl">{s.n}</div>
                  <div className="text-[9px] uppercase tracking-[0.18em] text-cream/45">{s.l}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Text side */}
          <div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="mb-3 flex items-center gap-3">
              <div className="h-px w-10 bg-cream/30" />
              <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-cream/50">Quiénes somos</span>
            </motion.div>

            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="font-heading text-3xl font-bold leading-tight text-cream sm:text-4xl lg:text-5xl">
              El sabor de<br />
              <span className="text-gradient-green">nuestra historia</span>
            </motion.h2>

            <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.15 }}
              className="mt-5 text-sm leading-relaxed text-cream/60 sm:text-base">
              Desde 2006 somos una empresa 100% integrada: participamos en cada eslabón de la cadena de valor, desde la cría del ganado hasta el mostrador. Sin intermediarios que comprometan lo que más importa: <em className="text-cream/80 not-italic">la calidad en tu plato</em>.
            </motion.p>

            {/* Pilares */}
            <div className="mt-8 space-y-5">
              {pilares.map((p, i) => (
                <motion.div key={p.title}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.12 }}
                  className="flex gap-4">
                  <div className="mt-1 h-4 w-4 shrink-0">
                    <div className="h-full w-full border border-campo/60 bg-campo/15" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-cream/90">{p.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-cream/50">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="/#contacto"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.5 }}
              className="mt-8 inline-flex items-center gap-2 border border-cream/20 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-cream/60 transition-all hover:border-cream/50 hover:text-cream">
              Contactanos
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.a>
          </div>

        </div>
      </div>
    </section>
  )
}
