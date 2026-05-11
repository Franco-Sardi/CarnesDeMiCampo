import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'motion/react'
import { useSucursales, crearPedido } from '../hooks/usePedidos'
import { useCarrito } from '../hooks/useCarrito'
import { generarMensajeWhatsApp, urlWhatsApp } from '../lib/carrito'

const fmt = (n: number) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(n)

interface FormValues {
  nombre_cliente: string
  telefono_cliente: string
  sucursal_id: string
  notas?: string
}

interface Props {
  onClose: () => void
}

type Estado =
  | { tipo: 'form' }
  | { tipo: 'enviando' }
  | { tipo: 'ok'; numero_pedido: string }
  | { tipo: 'error'; mensaje: string }

export default function CheckoutForm({ onClose }: Props) {
  const { sucursales, loading } = useSucursales()
  const { carrito, total, vaciar } = useCarrito()
  const [estado, setEstado] = useState<Estado>({ tipo: 'form' })

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()

  async function onSubmit(values: FormValues) {
    if (carrito.length === 0) {
      setEstado({ tipo: 'error', mensaje: 'El carrito está vacío.' })
      return
    }

    setEstado({ tipo: 'enviando' })

    try {
      const sucursal_id = values.sucursal_id ? parseInt(values.sucursal_id) : null
      const sucursal = sucursales.find(s => s.id === sucursal_id) ?? null

      const result = await crearPedido({
        sucursal_id,
        nombre_cliente: values.nombre_cliente.trim(),
        telefono_cliente: values.telefono_cliente.trim(),
        notas: values.notas?.trim() || undefined,
        items: carrito.map(i => ({
          producto_id: i.producto.id,
          cantidad_kg: i.cantidad_kg,
        })),
      })

      const mensaje = generarMensajeWhatsApp(carrito, {
        numero_pedido: result.numero_pedido,
        nombre_cliente: values.nombre_cliente.trim(),
        sucursal_nombre: sucursal?.nombre,
        notas: values.notas?.trim() || undefined,
      })

      const numeroDestino = sucursal?.whatsapp || '5492612342674'
      window.open(urlWhatsApp(numeroDestino, mensaje), '_blank', 'noopener,noreferrer')

      vaciar()
      setEstado({ tipo: 'ok', numero_pedido: result.numero_pedido })
    } catch (err) {
      setEstado({
        tipo: 'error',
        mensaje: err instanceof Error ? err.message : 'Error al crear el pedido',
      })
    }
  }

  // ── Estado: éxito ──────────────────────────────────────────────────────
  if (estado.tipo === 'ok') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center gap-4 px-6 py-12 text-center"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-campo/40 bg-campo/10">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-campo">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-dorado/70">Pedido enviado</p>
        <h3 className="font-heading text-xl font-bold text-cream">{estado.numero_pedido}</h3>
        <p className="max-w-sm text-sm leading-relaxed text-cream/55">
          Te abrimos WhatsApp con el detalle. La sucursal va a confirmarte la disponibilidad y los tiempos.
        </p>
        <button
          onClick={onClose}
          className="mt-4 cursor-pointer border border-dark-border px-6 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-cream/70 transition-colors hover:border-dorado/40 hover:text-cream"
        >
          Cerrar
        </button>
      </motion.div>
    )
  }

  // ── Estado: form / enviando / error ────────────────────────────────────
  const enviando = estado.tipo === 'enviando'

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-5">
      <div>
        <label className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.18em] text-cream/45">
          Nombre completo
        </label>
        <input
          {...register('nombre_cliente', { required: 'Ingresá tu nombre' })}
          className="w-full border border-dark-border bg-dark px-3 py-2.5 text-sm text-cream outline-none transition-colors focus:border-dorado/50"
          placeholder="Juan Pérez"
        />
        {errors.nombre_cliente && (
          <p className="mt-1 text-[10px] text-red-400">{errors.nombre_cliente.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.18em] text-cream/45">
          Teléfono / WhatsApp
        </label>
        <input
          {...register('telefono_cliente', {
            required: 'Ingresá un teléfono',
            minLength: { value: 8, message: 'Teléfono muy corto' },
          })}
          inputMode="tel"
          className="w-full border border-dark-border bg-dark px-3 py-2.5 text-sm text-cream outline-none transition-colors focus:border-dorado/50"
          placeholder="261 555 1234"
        />
        {errors.telefono_cliente && (
          <p className="mt-1 text-[10px] text-red-400">{errors.telefono_cliente.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.18em] text-cream/45">
          Sucursal de retiro
        </label>
        <select
          {...register('sucursal_id', { required: 'Elegí una sucursal' })}
          disabled={loading}
          className="w-full cursor-pointer border border-dark-border bg-dark px-3 py-2.5 text-sm text-cream outline-none transition-colors focus:border-dorado/50"
        >
          <option value="">{loading ? 'Cargando...' : 'Seleccionar sucursal'}</option>
          {sucursales.map(s => (
            <option key={s.id} value={s.id}>{s.nombre}</option>
          ))}
        </select>
        {errors.sucursal_id && (
          <p className="mt-1 text-[10px] text-red-400">{errors.sucursal_id.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.18em] text-cream/45">
          Notas (opcional)
        </label>
        <textarea
          {...register('notas')}
          rows={2}
          className="w-full resize-none border border-dark-border bg-dark px-3 py-2.5 text-sm text-cream outline-none transition-colors focus:border-dorado/50"
          placeholder="Cortar fino, sin grasa, etc."
        />
      </div>

      <div className="mt-2 flex items-baseline justify-between border-t border-dark-border pt-4">
        <span className="text-[10px] uppercase tracking-[0.2em] text-cream/45">Total a pagar</span>
        <span className="font-display text-xl font-medium text-dorado">{fmt(total)}</span>
      </div>

      {estado.tipo === 'error' && (
        <p className="border border-red-500/30 bg-red-500/10 px-3 py-2 text-[11px] text-red-300">
          {estado.mensaje}
        </p>
      )}

      <button
        type="submit"
        disabled={enviando || carrito.length === 0}
        className="mt-2 flex cursor-pointer items-center justify-center gap-2 bg-campo px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-cream transition-all hover:bg-campo-light disabled:cursor-not-allowed disabled:opacity-50"
      >
        {enviando ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-cream/40 border-t-cream" />
            Enviando...
          </>
        ) : (
          <>Confirmar y enviar por WhatsApp →</>
        )}
      </button>
    </form>
  )
}
