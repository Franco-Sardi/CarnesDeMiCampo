import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export interface Sucursal {
  id: number
  nombre: string
  direccion: string
  ciudad: string
  telefono?: string
  whatsapp?: string
  horarios?: string
  lat?: number
  lng?: number
  activa: boolean
  orden: number
}

export interface ItemPedidoInput {
  producto_id: number
  cantidad_kg: number
}

export interface CrearPedidoInput {
  sucursal_id: number | null
  nombre_cliente: string
  telefono_cliente: string
  notas?: string
  items: ItemPedidoInput[]
}

export interface CrearPedidoResult {
  numero_pedido: string
  pedido_id: number
  total: number
}

// ── Hook: lista de sucursales activas ────────────────────────────────────────
export function useSucursales() {
  const [sucursales, setSucursales] = useState<Sucursal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    supabase
      .from('sucursales')
      .select('*')
      .eq('activa', true)
      .order('orden', { ascending: true })
      .then(({ data, error }) => {
        if (error) setError(error.message)
        else setSucursales(data ?? [])
        setLoading(false)
      })
  }, [])

  return { sucursales, loading, error }
}

// ── Crear pedido (RPC server-side) ───────────────────────────────────────────
export async function crearPedido(input: CrearPedidoInput): Promise<CrearPedidoResult> {
  const { data, error } = await supabase.rpc('crear_pedido_completo', {
    p_sucursal_id: input.sucursal_id,
    p_nombre: input.nombre_cliente,
    p_telefono: input.telefono_cliente,
    p_notas: input.notas ?? null,
    p_items: input.items,
  })

  if (error) throw new Error(error.message)
  if (!data || (Array.isArray(data) && data.length === 0)) {
    throw new Error('Respuesta vacía del servidor al crear pedido')
  }

  const row = Array.isArray(data) ? data[0] : data
  return {
    numero_pedido: row.numero_pedido,
    pedido_id: Number(row.pedido_id),
    total: Number(row.total),
  }
}
