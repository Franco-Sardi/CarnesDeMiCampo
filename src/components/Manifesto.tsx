import { motion } from 'motion/react'

export default function Manifesto() {
  return (
    <section className="bg-dark-soft py-10 sm:py-14">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Decorative gold ornament */}
          <div className="mb-10 flex items-center justify-center gap-5">
            <div className="h-px w-20 bg-dorado/40" />
            <div className="h-1.5 w-1.5 rotate-45 bg-dorado/70" />
            <div className="h-px w-20 bg-dorado/40" />
          </div>

          {/* The quote — Cormorant italic, maximum elegance */}
          <blockquote className="font-display text-[clamp(1.8rem,4.5vw,3.8rem)] font-light italic leading-[1.25] text-cream/85">
            "Cada corte cuenta una historia.<br />
            La del campo, la del productor,<br />
            la de tu mesa."
          </blockquote>

          {/* Attribution */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 text-[10px] font-medium uppercase tracking-[0.38em] text-dorado/70"
          >
            — Carnes De Mi Campo, Mendoza
          </motion.p>

          {/* Bottom ornament */}
          <div className="mt-10 flex items-center justify-center gap-5">
            <div className="h-px w-20 bg-dorado/40" />
            <div className="h-1.5 w-1.5 rotate-45 bg-dorado/70" />
            <div className="h-px w-20 bg-dorado/40" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
