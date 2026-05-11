const links = [
  { href: '/#inicio', label: 'Inicio' },
  { href: '/#productos', label: 'Productos' },
  { href: '/#nosotros', label: 'Nosotros' },
  { href: '/#ofertas', label: 'Ofertas' },
  { href: '/#sucursales', label: 'Sucursales' },
  { href: '/#contacto', label: 'Contacto' },
]

export default function Footer() {
  return (
    <footer className="border-t border-dark-border bg-dark">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="mb-3 h-[2px] w-8 bg-dorado/50" />
            <h3 className="font-display text-xl font-light italic text-cream">
              Carnes de mi Campo
            </h3>
            <p className="mt-4 max-w-xs text-xs leading-relaxed text-cream/30">
              100% integrados. Participamos en todas las etapas de la cadena de valor para ofrecerte la mejor carne de Mendoza.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[9px] font-medium uppercase tracking-[0.25em] text-dorado/40">
              Navegación
            </h4>
            <ul className="mt-4 flex flex-col gap-2">
              {links.map(l => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="cursor-pointer text-xs text-cream/35 transition-colors duration-200 hover:text-dorado/80"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[9px] font-medium uppercase tracking-[0.25em] text-dorado/40">
              Contacto
            </h4>
            <ul className="mt-4 flex flex-col gap-2 text-xs text-cream/35">
              <li>+54 9 2612 34-2674</li>
              <li>ventas@carnesdemicampo.com.ar</li>
              <li className="leading-relaxed">Dorrego — Guaymallén, Mendoza</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-dark-border pt-6 text-[9px] tracking-[0.18em] text-cream/15 sm:flex-row">
          <p>&copy; 2026 Carnes De Mi Campo</p>
          <p>
            Diseñado por{' '}
            <a
              href="/"
              className="cursor-pointer text-dorado/30 transition-colors duration-200 hover:text-dorado/60"
            >
              LiniersWebs
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
