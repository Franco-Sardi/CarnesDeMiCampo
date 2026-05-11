import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useInView, animate } from 'motion/react'
import logo from '../assets/logo-web_Mesa-de-trabajo-1-1024x983.png'

const stats = [
  { from: 1995, to: 2006, suffix: '', label: 'Fundación' },
  { from: 0,    to: 6,    suffix: '', label: 'Sucursales' },
  { from: 50,   to: 100,  suffix: '%', label: 'Integrados' },
  { from: 0,    to: 20,   suffix: '+', label: 'Años' },
]

const pilares = [
  { n: '01', title: 'Del campo a tu mesa',      desc: 'Controlamos cada eslabón: cría, proceso y venta. Sin intermediarios que comprometan la calidad.' },
  { n: '02', title: 'Tradición mendocina',       desc: 'Nacimos en Mendoza y crecimos con ella. Parte del paisaje gastronómico provincial desde 2006.' },
  { n: '03', title: 'Mayoristas de confianza',  desc: 'Proveemos carnicerías y restaurantes con requisitos únicos. Calidad premium, logística y servicio que supera expectativas.' },
]

function CountUp({ from, to, suffix }: { from: number; to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const count = useMotionValue(from)
  const rounded = useTransform(count, Math.round)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  useEffect(() => {
    if (!inView) return
    const controls = animate(count, to, { duration: 2.2, ease: [0.16, 1, 0.3, 1] })
    return controls.stop
  }, [inView, count, to])

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}

function WordReveal({ text }: { text: string }) {
  const words = text.split(' ')
  return (
    <motion.p
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.045, delayChildren: 0.1 } },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0 }}
      className="mt-5 text-sm leading-relaxed text-cream/50"
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden:  { opacity: 0, y: 14, filter: 'blur(5px)' },
            visible: { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
          }}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  )
}

export default function SobreNosotros() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const xLeft  = useTransform(scrollYProgress, [0, 1], ['4%',  '-18%'])
  const xRight = useTransform(scrollYProgress, [0, 1], ['-4%', '18%'])

  return (
    <section ref={sectionRef} id="nosotros" className="bg-dark-soft">

      {/* ── Scroll-linked opposing marquee ── */}
      <div className="overflow-hidden border-y border-dark-border py-5">
        <motion.p
          style={{ x: xLeft }}
          className="whitespace-nowrap font-heading text-[clamp(1.6rem,3.5vw,3rem)] font-bold uppercase leading-none tracking-[0.12em] text-cream/[0.05]"
        >
          {'Nuestra Historia · Mendoza · Campo Propio · Ganadería Sustentable · Nuestra Historia · Mendoza · Campo Propio · Ganadería Sustentable ·'}
        </motion.p>
        <motion.p
          style={{ x: xRight }}
          className="mt-1 whitespace-nowrap font-display text-[clamp(1.6rem,3.5vw,3rem)] font-light italic leading-none tracking-[0.08em] text-dorado/[0.14]"
        >
          {'Quiénes Somos · Pasión · Origen · Calidad · Compromiso · Quiénes Somos · Pasión · Origen · Calidad · Compromiso ·'}
        </motion.p>
      </div>

      {/* ── Main content ── */}
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20 lg:items-start">

          {/* ── Left: editorial text block ── */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0 }}
              className="mb-4"
            >
              <div className="mb-3 h-[2px] w-10 bg-dorado" />
              <span className="text-[10px] font-medium uppercase tracking-[0.38em] text-dorado/60">
                Quiénes somos
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading text-3xl font-bold leading-tight text-cream sm:text-4xl"
            >
              El sabor de{' '}
              <span className="text-gradient-gold">nuestra historia</span>
            </motion.h2>

            <WordReveal text="Desde 2006 somos una empresa 100% integrada: participamos en cada eslabón de la cadena de valor, desde la cría del ganado hasta el mostrador. Sin intermediarios." />

            <motion.a
              href="/#contacto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ delay: 0.4 }}
              className="group relative mt-8 inline-flex cursor-pointer items-center gap-3 overflow-hidden border border-dorado/30 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-cream/50 transition-colors duration-300 hover:border-dorado hover:text-cream"
            >
              <span className="absolute inset-0 -translate-x-full bg-dorado/8 transition-transform duration-500 group-hover:translate-x-0" />
              <span className="relative">Contactanos</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="relative transition-transform group-hover:translate-x-1">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.a>

            {/* Logo centrado */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 flex justify-center"
            >
              <div className="relative">
                {/* Glow dorado detrás */}
                <div className="absolute inset-0 rounded-full bg-dorado/15 blur-3xl scale-125" />
                {/* Anillo exterior dashed */}
                <div className="absolute inset-[-18px] rounded-full border border-dashed border-dorado/20" />
                {/* Anillo interior sólido */}
                <div className="absolute inset-[-8px] rounded-full border border-dorado/30" />
                <img
                  src={logo}
                  alt="Carnes de mi Campo"
                  className="relative h-44 w-auto"
                />
              </div>
            </motion.div>
          </div>

          {/* ── Right: stats + pilares ── */}
          <div>

            {/* 2x2 counter grid */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.55 }}
              className="mb-8 grid grid-cols-2 gap-px border border-dark-border bg-dark-border"
            >
              {stats.map((s) => (
                <div key={s.label} className="bg-dark-soft px-5 py-5 text-center">
                  <div className="font-display text-3xl font-light italic leading-none text-dorado">
                    <CountUp from={s.from} to={s.to} suffix={s.suffix} />
                  </div>
                  <div className="mt-1.5 text-[8px] font-semibold uppercase tracking-[0.25em] text-cream/30">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Pilares — 3D tilt hover */}
            <motion.div
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0 }}
              className="space-y-3"
            >
              {pilares.map((p) => (
                <motion.div
                  key={p.n}
                  variants={{
                    hidden:  { opacity: 0, x: 18 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  whileHover={{
                    y: -3,
                    rotateX: 3,
                    rotateY: -2,
                    boxShadow: '0 16px 40px rgba(0,0,0,0.45)',
                    transition: { type: 'spring', stiffness: 280, damping: 22 },
                  }}
                  style={{ transformStyle: 'preserve-3d', transformPerspective: 900 }}
                  className="flex cursor-default gap-4 border border-dark-border bg-dark-card p-4"
                >
                  <span className="mt-0.5 shrink-0 font-display text-xs italic text-dorado/40">{p.n}</span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-cream/85">{p.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-cream/40">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}
