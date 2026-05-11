import { useState, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { useProductosCatalogo } from '../hooks/useProductos'

const CATEGORIAS = ['Todos', 'Vacuno', 'Cerdo', 'Pollo', 'Embutidos', 'Packs']

const SORT_OPTIONS = [
  { label: 'Destacados',   value: 'orden'      },
  { label: 'Precio ↑',    value: 'precio-asc'  },
  { label: 'Precio ↓',    value: 'precio-desc' },
  { label: 'Nombre A–Z',  value: 'nombre'      },
]

const fmt = (n: number) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(n)

function Skeleton() {
  return (
    <div className="animate-pulse border border-dark-border bg-dark-card">
      <div className="aspect-[4/3] bg-dark-soft" />
      <div className="space-y-2 p-4">
        <div className="h-2 w-1/3 rounded bg-dark-soft" />
        <div className="h-3 w-2/3 rounded bg-dark-soft" />
        <div className="h-4 w-1/2 rounded bg-dark-soft" />
      </div>
    </div>
  )
}

export default function CatalogoPage() {
  const [catActiva, setCatActiva] = useState<string>('Todos')
  const [sort, setSort] = useState('orden')
  const [search, setSearch] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)

  const categoria = catActiva === 'Todos' ? null : catActiva
  const { productos, loading } = useProductosCatalogo(categoria)

  const sorted = useMemo(() => {
    let arr = [...productos]
    if (sort === 'precio-asc')  arr.sort((a, b) => a.precio - b.precio)
    if (sort === 'precio-desc') arr.sort((a, b) => b.precio - a.precio)
    if (sort === 'nombre')      arr.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))
    if (search.trim()) {
      const q = search.toLowerCase()
      arr = arr.filter(p =>
        p.nombre.toLowerCase().includes(q) ||
        p.corte?.toLowerCase().includes(q) ||
        p.nombres_alt?.some(a => a.toLowerCase().includes(q))
      )
    }
    return arr
  }, [productos, sort, search])

  return (
    <div className="min-h-screen bg-dark">

      {/* ── Page header ── */}
      <div className="border-b border-dark-border bg-dark-soft pt-24 pb-8 sm:pt-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-5 flex items-center gap-2 text-[9px] uppercase tracking-[0.25em] text-cream/25">
            <Link to="/" className="transition-colors hover:text-cream/50">Inicio</Link>
            <span>/</span>
            <span className="text-dorado/60">Catálogo</span>
          </div>

          <div className="mb-3 h-[2px] w-10 bg-dorado" />
          <span className="text-[10px] font-medium uppercase tracking-[0.38em] text-dorado/70">
            Nuestros Cortes
          </span>
          <h1 className="mt-2 font-heading text-3xl font-bold text-cream sm:text-4xl">
            Catálogo <span className="text-gradient-gold">completo</span>
          </h1>
          <p className="mt-2 text-[12px] text-cream/30">
            {loading ? '––' : sorted.length}{' '}
            producto{!loading && sorted.length !== 1 ? 's' : ''} disponibles
          </p>
        </div>
      </div>

      {/* ── Filter bar ── */}
      <div className="border-b border-dark-border bg-dark-soft">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          {/* Row 1: Search + Sort */}
          <div className="flex items-center gap-3 border-b border-dark-border/50 py-2.5">
            {/* Search input */}
            <div className="relative flex-1 max-w-xs">
              <svg className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-cream/30" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar corte..."
                className="w-full border border-dark-border bg-dark py-1.5 pl-8 pr-8 text-[11px] text-cream/70 outline-none placeholder:text-cream/25 transition-colors focus:border-dorado/40"
              />
              {search && (
                <button
                  onClick={() => { setSearch(''); searchRef.current?.focus() }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer text-cream/30 transition-colors hover:text-cream/70"
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 6 6 18M6 6l12 12"/>
                  </svg>
                </button>
              )}
            </div>

            {/* Sort select */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="ml-auto shrink-0 cursor-pointer border border-dark-border bg-dark px-3 py-1.5 text-[10px] uppercase tracking-[0.1em] text-cream/50 outline-none transition-colors focus:border-dorado/40"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* Row 2: Category pills */}
          <div className="flex gap-2 overflow-x-auto py-2.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {CATEGORIAS.map((cat) => (
              <button
                key={cat}
                onClick={() => setCatActiva(cat)}
                className={`shrink-0 cursor-pointer px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] transition-all duration-200 ${
                  catActiva === cat
                    ? 'bg-dorado text-dark'
                    : 'border border-dark-border text-cream/45 hover:border-dorado/40 hover:text-cream'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-12">
        {loading ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
            {Array.from({ length: 9 }).map((_, i) => <Skeleton key={i} />)}
          </div>
        ) : sorted.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-sm text-cream/30">No hay productos en esta categoría.</p>
            <button
              onClick={() => setCatActiva('Todos')}
              className="mt-4 text-[10px] uppercase tracking-[0.14em] text-dorado/60 transition-colors hover:text-dorado"
            >
              Ver todos →
            </button>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={catActiva}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5"
            >
              {sorted.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.035 }}
                  className="group cursor-pointer border border-dark-border bg-dark-card transition-colors duration-300 hover:border-dorado/40"
                >
                  <Link to={`/producto/${p.id}`} className="block">
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={p.imagen}
                        alt={p.nombre}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-card/75 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      {/* Badge */}
                      {p.badge && (
                        <span className={`absolute left-2.5 top-2.5 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                          p.es_oferta ? 'bg-red-700 text-cream' : 'bg-dorado text-dark'
                        }`}>
                          {p.badge}
                        </span>
                      )}

                      {/* Hover CTA */}
                      <div className="absolute inset-x-0 bottom-0 flex translate-y-2 items-center justify-center pb-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <span className="bg-dark/85 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-cream backdrop-blur-sm">
                          Ver detalle →
                        </span>
                      </div>
                    </div>

                    {/* Card footer */}
                    <div className="p-3.5">
                      <p className="text-[9px] uppercase tracking-wider text-warm/60">
                        {p.categoria || p.corte}
                      </p>
                      <h3 className="mt-0.5 font-heading text-[13px] font-bold leading-tight text-cream transition-colors duration-200 group-hover:text-dorado-light">
                        {p.nombre}
                      </h3>
                      <div className="mt-1.5 flex items-baseline gap-2">
                        <span className="font-display text-sm italic text-cream/85">
                          {fmt(p.precio)}
                        </span>
                        {p.precio_ant && (
                          <span className="text-[10px] text-warm/45 line-through">
                            {fmt(p.precio_ant)}
                          </span>
                        )}
                      </div>
                      <div className="mt-2.5 h-px w-0 bg-dorado/50 transition-all duration-300 group-hover:w-full" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}
