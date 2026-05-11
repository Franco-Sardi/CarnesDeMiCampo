import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useAllProductos, deleteProducto, toggleActivo } from '../hooks/useProductos'

const fmt = (n: number) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(n)

export default function AdminPage() {
  const { signOut } = useAuth()
  const { productos, loading, refetch } = useAllProductos()
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null)
  const [busy, setBusy] = useState<number | null>(null)

  const handleDelete = async (id: number) => {
    setBusy(id)
    await deleteProducto(id)
    setConfirmDelete(null)
    refetch()
    setBusy(null)
  }

  const handleToggle = async (id: number, activo: boolean) => {
    setBusy(id)
    await toggleActivo(id, !activo)
    refetch()
    setBusy(null)
  }

  return (
    <div className="min-h-screen bg-dark">
      {/* Admin header */}
      <header className="border-b border-dark-border bg-dark-soft px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <p className="text-[9px] uppercase tracking-[0.3em] text-dorado/50">Panel Admin</p>
            <h1 className="font-display text-lg font-light italic text-cream">
              Carnes de mi Campo
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-[10px] uppercase tracking-wider text-cream/30 transition-colors hover:text-cream"
            >
              ← Ver sitio
            </Link>
            <button
              onClick={signOut}
              className="cursor-pointer border border-dark-border px-4 py-2 text-[10px] uppercase tracking-wider text-cream/40 transition-colors hover:border-dorado/40 hover:text-cream"
            >
              Salir
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Top bar */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="mb-1 h-[2px] w-8 bg-dorado" />
            <h2 className="font-heading text-xl font-bold text-cream">Productos</h2>
          </div>
          <Link
            to="/admin/producto/nuevo"
            className="cursor-pointer border border-campo bg-campo px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-cream transition-colors hover:bg-campo-light"
          >
            + Nuevo producto
          </Link>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-dorado border-t-transparent" />
          </div>
        ) : (
          <div className="border border-dark-border bg-dark-card">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-dark-border">
                    {['Imagen', 'Nombre', 'Corte', 'Precio', 'Tipo', 'Estado', 'Acciones'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.2em] text-cream/30">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-border">
                  {productos.map(p => (
                    <tr key={p.id} className={`transition-colors hover:bg-dark-soft ${!p.activo ? 'opacity-50' : ''}`}>
                      {/* Imagen */}
                      <td className="px-4 py-3">
                        {p.imagen ? (
                          <img src={p.imagen} alt={p.nombre} className="h-12 w-12 object-cover border border-dark-border" />
                        ) : (
                          <div className="h-12 w-12 bg-dark-soft border border-dark-border flex items-center justify-center">
                            <span className="text-[9px] text-cream/20">sin img</span>
                          </div>
                        )}
                      </td>

                      {/* Nombre */}
                      <td className="px-4 py-3">
                        <p className="font-heading text-sm font-bold text-cream">{p.nombre}</p>
                        {p.badge && (
                          <span className="mt-0.5 inline-block bg-dorado px-1.5 py-0.5 text-[8px] font-bold uppercase text-dark">
                            {p.badge}
                          </span>
                        )}
                      </td>

                      {/* Corte */}
                      <td className="px-4 py-3 text-xs text-cream/50">{p.corte}</td>

                      {/* Precio */}
                      <td className="px-4 py-3">
                        <span className="font-display text-sm italic text-campo">{fmt(p.precio)}</span>
                        {p.precio_ant && (
                          <span className="ml-2 text-[10px] text-warm/40 line-through">{fmt(p.precio_ant)}</span>
                        )}
                      </td>

                      {/* Tipo */}
                      <td className="px-4 py-3">
                        <span className={`text-[9px] font-semibold uppercase tracking-wider ${p.es_oferta ? 'text-dorado' : 'text-cream/30'}`}>
                          {p.es_oferta ? 'Oferta' : 'Normal'}
                        </span>
                      </td>

                      {/* Estado */}
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleToggle(p.id, p.activo)}
                          disabled={busy === p.id}
                          className={`cursor-pointer text-[9px] font-semibold uppercase tracking-wider transition-colors disabled:opacity-40 ${
                            p.activo ? 'text-campo hover:text-campo-dark' : 'text-cream/30 hover:text-cream'
                          }`}
                        >
                          {p.activo ? '● Activo' : '○ Inactivo'}
                        </button>
                      </td>

                      {/* Acciones */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Link
                            to={`/admin/producto/${p.id}/editar`}
                            className="text-[10px] font-semibold uppercase tracking-wider text-dorado/60 transition-colors hover:text-dorado"
                          >
                            Editar
                          </Link>
                          {confirmDelete === p.id ? (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleDelete(p.id)}
                                disabled={busy === p.id}
                                className="cursor-pointer text-[10px] font-semibold uppercase tracking-wider text-red-400 hover:text-red-300 disabled:opacity-40"
                              >
                                Confirmar
                              </button>
                              <button
                                onClick={() => setConfirmDelete(null)}
                                className="cursor-pointer text-[10px] text-cream/30 hover:text-cream"
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setConfirmDelete(p.id)}
                              className="cursor-pointer text-[10px] font-semibold uppercase tracking-wider text-cream/25 transition-colors hover:text-red-400"
                            >
                              Eliminar
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {productos.length === 0 && (
                <div className="py-16 text-center text-sm text-cream/25">
                  No hay productos aún.{' '}
                  <Link to="/admin/producto/nuevo" className="text-dorado/60 hover:text-dorado">
                    Creá el primero
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Stats row */}
        {!loading && productos.length > 0 && (
          <div className="mt-4 flex gap-6 text-[10px] text-cream/25">
            <span>{productos.filter(p => p.activo && !p.es_oferta).length} productos activos</span>
            <span>{productos.filter(p => p.es_oferta).length} ofertas</span>
            <span>{productos.filter(p => !p.activo).length} inactivos</span>
          </div>
        )}
      </main>
    </div>
  )
}
