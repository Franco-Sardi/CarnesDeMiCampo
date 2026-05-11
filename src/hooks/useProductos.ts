import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export interface Producto {
  id: number
  nombre: string
  nombres_alt: string[]
  corte: string
  categoria: string
  precio: number
  precio_ant?: number
  imagen: string
  badge?: string
  descripcion: string
  ubicacion: string
  pedido: string
  coccion: string
  ideal_para: string
  historia: string
  pro_tip: string
  metodos: string[]
  cut_id?: string
  es_oferta: boolean
  activo: boolean
  orden: number
}

export type ProductoInput = Omit<Producto, 'id' | 'activo' | 'orden'> & {
  activo?: boolean
  orden?: number
}

// ── Public hooks ──────────────────────────────────────────────

export function useProductos() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    supabase
      .from('productos')
      .select('*')
      .eq('activo', true)
      .eq('es_oferta', false)
      .order('orden', { ascending: true })
      .then(({ data, error }) => {
        if (error) setError(error.message)
        else setProductos(data ?? [])
        setLoading(false)
      })
  }, [])

  return { productos, loading, error }
}

export function useOfertas() {
  const [ofertas, setOfertas] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('productos')
      .select('*')
      .eq('activo', true)
      .eq('es_oferta', true)
      .order('orden', { ascending: true })
      .then(({ data }) => {
        setOfertas(data ?? [])
        setLoading(false)
      })
  }, [])

  return { ofertas, loading }
}

export function useProducto(id: number | string) {
  const [producto, setProducto] = useState<Producto | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    supabase
      .from('productos')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data, error }) => {
        if (error) setError(error.message)
        else setProducto(data)
        setLoading(false)
      })
  }, [id])

  return { producto, loading, error }
}

// ── Admin CRUD ────────────────────────────────────────────────

export async function createProducto(data: ProductoInput) {
  const { error } = await supabase.from('productos').insert(data)
  if (error) throw error
}

export async function updateProducto(id: number, data: Partial<ProductoInput>) {
  const { error } = await supabase.from('productos').update(data).eq('id', id)
  if (error) throw error
}

export async function deleteProducto(id: number) {
  const { error } = await supabase.from('productos').delete().eq('id', id)
  if (error) throw error
}

export async function toggleActivo(id: number, activo: boolean) {
  const { error } = await supabase.from('productos').update({ activo }).eq('id', id)
  if (error) throw error
}

// ── Catálogo completo (incluye ofertas, filtra por categoría) ────────────────

export function useProductosCatalogo(categoria: string | null = null) {
  const [productos, setProductos] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    let q = supabase
      .from('productos')
      .select('*')
      .eq('activo', true)
      .order('orden', { ascending: true })

    if (categoria) q = q.eq('categoria', categoria)

    q.then(({ data }) => {
      setProductos(data ?? [])
      setLoading(false)
    })
  }, [categoria])

  return { productos, loading }
}

// Hook para admin (incluye inactivos y todos los campos)
export function useAllProductos() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)

  const fetch = () => {
    setLoading(true)
    supabase
      .from('productos')
      .select('*')
      .order('orden', { ascending: true })
      .then(({ data }) => {
        setProductos(data ?? [])
        setLoading(false)
      })
  }

  useEffect(() => { fetch() }, [])

  return { productos, loading, refetch: fetch }
}
