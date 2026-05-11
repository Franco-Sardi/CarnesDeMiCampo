import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useCarrito } from '../hooks/useCarrito'
import { calcularSubtotal } from '../lib/carrito'
import CheckoutForm from './CheckoutForm'

const fmt = (n: number) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(n)

interface Props {
  open: boolean
  onClose: () => void
}

export default function CarritoDrawer({ open, onClose }: Props) {
  const { carrito, total, quitar, actualizar, vaciar } = useCarrito()
  const [vista, setVista] = useState<'carrito' | 'checkout'>('carrito')

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (!open) setVista('carrito')
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-dark-soft shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-dark-border px-5 py-4">
              <div className="flex items-center gap-3">
                {vista === 'checkout' && (
                  <button
                    onClick={() => setVista('carrito')}
                    aria-label="Volver"
                    className="cursor-pointer text-cream/55 transition-colors hover:text-cream"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                  </button>
                )}
                <div>
                  <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-dorado/70">
                    {vista === 'carrito' ? 'Tu pedido' : 'Tus datos'}
                  </p>
                  <h2 className="font-heading text-lg font-bold text-cream">
                    {vista === 'carrito' ? 'Carrito' : 'Confirmar pedido'}
                  </h2>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Cerrar"
                className="cursor-pointer text-cream/55 transition-colors hover:text-cream"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto">
              {vista === 'checkout' ? (
                <CheckoutForm onClose={onClose} />
              ) : carrito.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-dark-border">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cream/35">
                      <circle cx="9" cy="21" r="1" />
                      <circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
                    </svg>
                  </div>
                  <p className="text-sm text-cream/45">Tu carrito está vacío.</p>
                  <button
                    onClick={onClose}
                    className="mt-3 cursor-pointer text-[10px] font-semibold uppercase tracking-wider text-dorado/70 transition-colors hover:text-dorado"
                  >
                    Seguir explorando →
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-dark-border">
                  {carrito.map(item => {
                    const sub = calcularSubtotal(item)
                    return (
                      <li key={item.producto.id} className="flex gap-3 p-4">
                        <img
                          src={item.producto.imagen}
                          alt={item.producto.nombre}
                          className="h-20 w-20 flex-shrink-0 object-cover"
                        />
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <h3 className="truncate font-heading text-sm font-bold text-cream">
                                {item.producto.nombre}
                              </h3>
                              <p className="text-[10px] uppercase tracking-wider text-warm/60">
                                {item.producto.corte}
                              </p>
                            </div>
                            <button
                              onClick={() => quitar(item.producto.id)}
                              aria-label="Quitar"
                              className="cursor-pointer text-cream/30 transition-colors hover:text-red-400"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                              </svg>
                            </button>
                          </div>

                          <div className="mt-auto flex items-end justify-between pt-2">
                            {/* Stepper de cantidad */}
                            <div className="flex items-center border border-dark-border bg-dark">
                              <button
                                onClick={() => actualizar(item.producto.id, +(Math.max(0.25, item.cantidad_kg - 0.25)).toFixed(2))}
                                aria-label="Disminuir"
                                className="cursor-pointer px-2.5 py-1 text-cream/60 hover:bg-dark-soft hover:text-cream"
                              >
                                −
                              </button>
                              <span className="min-w-[3rem] border-x border-dark-border px-2 py-1 text-center text-xs font-medium text-cream">
                                {item.cantidad_kg} kg
                              </span>
                              <button
                                onClick={() => actualizar(item.producto.id, +(item.cantidad_kg + 0.25).toFixed(2))}
                                aria-label="Aumentar"
                                className="cursor-pointer px-2.5 py-1 text-cream/60 hover:bg-dark-soft hover:text-cream"
                              >
                                +
                              </button>
                            </div>

                            <span className="font-display text-sm font-medium text-dorado">{fmt(sub)}</span>
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>

            {/* Footer (solo en vista carrito y con items) */}
            {vista === 'carrito' && carrito.length > 0 && (
              <div className="border-t border-dark-border bg-dark px-5 py-4">
                <div className="flex items-baseline justify-between pb-3">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-cream/45">Total</span>
                  <span className="font-display text-2xl font-medium text-dorado">{fmt(total)}</span>
                </div>
                <button
                  onClick={() => setVista('checkout')}
                  className="flex w-full cursor-pointer items-center justify-center gap-2 bg-campo px-6 py-3 text-xs font-semibold uppercase tracking-wider text-cream transition-all hover:bg-campo-light"
                >
                  Confirmar pedido →
                </button>
                <button
                  onClick={vaciar}
                  className="mt-2 w-full cursor-pointer text-[10px] uppercase tracking-wider text-cream/35 transition-colors hover:text-red-400"
                >
                  Vaciar carrito
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
