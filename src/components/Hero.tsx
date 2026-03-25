import { motion } from 'motion/react'

export default function Hero() {
  return (
    <section id="inicio" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1920&q=80')" }} />
      <div className="absolute inset-0 bg-dark/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-dark/50" />

      {/* Vertical accent line */}
      <motion.div initial={{ height: 0 }} animate={{ height: 80 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent to-campo" />

      <div className="relative z-10 mx-auto max-w-5xl px-5 text-center sm:px-6">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-4 text-[10px] font-medium uppercase tracking-[0.4em] text-campo sm:text-xs">
          100% Integrados — Del productor a tu mesa
        </motion.p>

        <div className="overflow-hidden">
          <motion.h1 initial={{ y: '100%' }} animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-[clamp(2.5rem,8vw,7rem)] font-bold leading-[0.9] text-cream">
            Del Campo
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1 initial={{ y: '100%' }} animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-[clamp(2.5rem,8vw,7rem)] font-bold leading-[0.9]">
            <span className="text-gradient-green">a tu Mesa</span>
          </motion.h1>
        </div>

        <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-warm sm:text-base">
          Los mejores cortes de carne premium con la calidad y tradición que tu familia merece.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
          <a href="#productos"
            className="w-full border border-campo bg-campo px-8 py-3 text-center text-xs font-semibold uppercase tracking-[0.12em] text-cream transition-all hover:bg-campo-light sm:w-auto">
            Ver Productos
          </a>
          <a href="#contacto"
            className="w-full border border-cream/20 px-8 py-3 text-center text-xs font-semibold uppercase tracking-[0.12em] text-cream/60 transition-all hover:border-cream/40 hover:text-cream sm:w-auto">
            Contactanos
          </a>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1">
        <span className="text-[9px] uppercase tracking-[0.3em] text-cream/25">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.4, repeat: Infinity }}
          className="h-8 w-px bg-gradient-to-b from-cream/30 to-transparent" />
      </motion.div>
    </section>
  )
}
