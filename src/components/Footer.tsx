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
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-2">
            <h3 className="font-heading text-lg font-bold text-cream">CARNES DE MI CAMPO</h3>
            <p className="mt-3 max-w-xs text-xs leading-relaxed text-cream/30">
              100% integrados. Participamos en todas las etapas de la cadena de valor para ofrecerte la mejor carne.
            </p>
          </div>
          <div>
            <h4 className="text-[10px] font-medium uppercase tracking-[0.2em] text-cream/20">Navegación</h4>
            <ul className="mt-3 flex flex-col gap-1.5">
              {links.map(l => (
                <li key={l.href}><a href={l.href} className="text-xs text-cream/40 transition-colors hover:text-campo">{l.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-medium uppercase tracking-[0.2em] text-cream/20">Contacto</h4>
            <ul className="mt-3 flex flex-col gap-1.5 text-xs text-cream/40">
              <li>+54 9 261 640-1013</li>
              <li>ventas@carnesdemicampo.com.ar</li>
              <li>Dorrego - Guaymallén, Mendoza</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-dark-border pt-6 text-[10px] tracking-wider text-cream/15 sm:flex-row">
          <p>&copy; 2026 Carnes De Mi Campo</p>
          <p>Diseñado por <span className="text-campo/40 hover:text-campo transition-colors">LiniersWebs</span></p>
        </div>
      </div>
    </footer>
  )
}
