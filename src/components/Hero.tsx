import { motion } from 'motion/react'

const ease = [0.16, 1, 0.3, 1] as const
const VIDEO_SRC = '/hero.mp4'
const VIDEO_POSTER = '/hero-poster.jpg'

export default function Hero() {
  return (
    <section id="inicio" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* Background photography */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1920&q=80')" }}
      />

      {/* Gradients */}
      <div className="absolute inset-0 bg-dark/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark/95 via-dark/60 to-dark/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-dark/35" />

      {/* Navbar spacer fijo */}
      <div className="h-20 shrink-0 lg:h-24" />

      {/* Contenido — centrado verticalmente en el espacio restante */}
      <div className="relative z-10 flex flex-1 w-full items-center px-8 py-8 lg:px-16 lg:py-12">
        <div className="mx-auto max-w-7xl w-full">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-20">

            {/* ── Text block ── */}
            <div className="max-w-2xl flex-1 min-w-0">

              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease }}
              >
                <div className="mb-3 h-[2px] w-10 bg-dorado" />
                <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-dorado/80">
                  Del productor a tu mesa · Mendoza
                </p>
              </motion.div>

              <div className="mt-3 lg:mt-5">
                <div className="overflow-hidden">
                  <motion.h1
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.05, delay: 0.5, ease }}
                    className="font-display text-[clamp(2.8rem,7.5vw,9.5rem)] font-light leading-none tracking-tight text-cream"
                  >
                    Carnes
                  </motion.h1>
                </div>
                <div className="overflow-hidden">
                  <motion.h1
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.05, delay: 0.64, ease }}
                    className="font-display text-[clamp(2.8rem,7.5vw,9.5rem)] font-light italic leading-none tracking-tight text-dorado"
                  >
                    de mi Campo.
                  </motion.h1>
                </div>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.98 }}
                className="mt-4 max-w-sm text-[13px] leading-relaxed text-cream/50 sm:text-sm lg:mt-7"
              >
                100% integrados. Del ganado Hereford y Angus criado en Mendoza,
                directo a tu mesa. Sin intermediarios.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.12 }}
                className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:gap-4 lg:mt-10"
              >
                <a
                  href="#productos"
                  className="cursor-pointer border border-campo bg-campo px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-cream transition-colors duration-300 hover:bg-campo-light"
                >
                  Ver Productos
                </a>
                <a
                  href="#contacto"
                  className="group relative cursor-pointer overflow-hidden border border-dorado/40 px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-cream/70 transition-colors duration-300 hover:border-dorado hover:text-cream"
                >
                  <span className="absolute inset-0 -translate-x-full bg-dorado/10 transition-transform duration-500 group-hover:translate-x-0" />
                  <span className="relative">Contactanos</span>
                </a>
              </motion.div>

              {/* ── Video mobile — debajo de los botones, solo en sm/md ── */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.3, ease }}
                className="mt-8 lg:hidden"
              >
                <div className="relative p-2.5">
                  <div className="absolute top-0 left-0 h-5 w-5 border-t-2 border-l-2 border-dorado/50" />
                  <div className="absolute top-0 right-0 h-5 w-5 border-t-2 border-r-2 border-dorado/50" />
                  <div className="absolute bottom-0 left-0 h-5 w-5 border-b-2 border-l-2 border-dorado/50" />
                  <div className="absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-dorado/50" />
                  <video
                    src={VIDEO_SRC}
                    poster={VIDEO_POSTER}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="w-full aspect-video object-cover opacity-85"
                  />
                </div>
                <p className="mt-1 text-right text-[9px] uppercase tracking-[0.28em] text-dorado/35">
                  Nuestro campo · Mendoza
                </p>
              </motion.div>

            </div>

            {/* ── Video panel — desktop only, feathered edges ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, delay: 1.3, ease }}
              className="hidden shrink-0 lg:block"
              style={{ width: 'clamp(380px, 44%, 560px)' }}
            >
              <div className="relative p-3">
                <div className="absolute top-0 left-0 h-7 w-7 border-t-2 border-l-2 border-dorado/55" />
                <div className="absolute top-0 right-0 h-7 w-7 border-t-2 border-r-2 border-dorado/55" />
                <div className="absolute bottom-0 left-0 h-7 w-7 border-b-2 border-l-2 border-dorado/55" />
                <div className="absolute bottom-0 right-0 h-7 w-7 border-b-2 border-r-2 border-dorado/55" />

                <div
                  style={{
                    aspectRatio: '16 / 9',
                    maskImage:
                      'radial-gradient(ellipse 92% 88% at 55% 50%, black 55%, rgba(0,0,0,0.75) 76%, transparent 94%)',
                    WebkitMaskImage:
                      'radial-gradient(ellipse 92% 88% at 55% 50%, black 55%, rgba(0,0,0,0.75) 76%, transparent 94%)',
                  }}
                >
                  <video
                    src={VIDEO_SRC}
                    poster={VIDEO_POSTER}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 0.7 }}
                className="mt-1 text-right text-[9px] uppercase tracking-[0.28em] text-dorado/35"
              >
                Nuestro campo · Mendoza
              </motion.p>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[8px] uppercase tracking-[0.35em] text-cream/20">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="h-8 w-px bg-gradient-to-b from-dorado/40 to-transparent"
        />
      </motion.div>
    </section>
  )
}
