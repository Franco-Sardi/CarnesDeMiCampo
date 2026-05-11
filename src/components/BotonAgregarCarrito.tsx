import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useCarrito } from '../hooks/useCarrito'
import type { Producto } from '../hooks/useProductos'

interface Props {
  producto: Producto
  defaultKg?: number
  className?: string
}

export default function BotonAgregarCarrito({ producto, defaultKg = 1, className = '' }: Props) {
  const { agregar } = useCarrito()
  const [kg, setKg] = useState<number>(defaultKg)
  const [agregado, setAgregado] = useState(false)

  const inc = () => setKg(k => +(Math.max(0.25, k + 0.25)).toFixed(2))
  const dec = () => setKg(k => +(Math.max(0.25, k - 0.25)).toFixed(2))

  const onAdd = () => {
    if (kg <= 0) return
    agregar(producto, kg)
    setAgregado(true)
    setTimeout(() => setAgregado(false), 1800)
  }

  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:items-stretch ${className}`}>
      {/* Stepper de kg */}
      <div className="flex items-stretch border border-dark-border bg-dark-card">
        <button
          type="button"
          onClick={dec}
          aria-label="Disminuir"
          className="cursor-pointer px-4 text-cream/60 transition-colors hover:bg-dark-soft hover:text-cream"
        >
          −
        </button>
        <div className="flex w-20 flex-col items-center justify-center border-x border-dark-border px-2">
          <input
            type="number"
            step="0.25"
            min="0.25"
            value={kg}
            onChange={(e) => {
              const v = parseFloat(e.target.value)
              setKg(isNaN(v) ? 0 : Math.max(0, v))
            }}
            className="w-full bg-transparent text-center font-display text-base font-medium text-cream outline-none"
          />
          <span className="text-[8px] uppercase tracking-[0.2em] text-cream/35">kg</span>
        </div>
        <button
          type="button"
          onClick={inc}
          aria-label="Aumentar"
          className="cursor-pointer px-4 text-cream/60 transition-colors hover:bg-dark-soft hover:text-cream"
        >
          +
        </button>
      </div>

      {/* Botón agregar */}
      <button
        type="button"
        onClick={onAdd}
        disabled={kg <= 0}
        className="relative flex flex-1 cursor-pointer items-center justify-center gap-2 overflow-hidden bg-campo px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-cream transition-all hover:bg-campo-light disabled:cursor-not-allowed disabled:opacity-50"
      >
        <AnimatePresence mode="wait" initial={false}>
          {agregado ? (
            <motion.span
              key="ok"
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 13l4 4L19 7" />
              </svg>
              Agregado
            </motion.span>
          ) : (
            <motion.span
              key="add"
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
              </svg>
              Agregar al carrito
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  )
}
