import { useEffect, useState, useCallback } from 'react'
import {
  agregarItem,
  quitarItem,
  actualizarCantidad,
  calcularTotal,
  vaciarCarrito,
  type ItemCarrito,
} from '../lib/carrito'
import type { Producto } from './useProductos'

const STORAGE_KEY = 'cdmc-carrito'
const EVENT = 'cdmc-carrito-update'

function leerCarritoLS(): ItemCarrito[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function guardarCarritoLS(carrito: ItemCarrito[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(carrito))
  window.dispatchEvent(new Event(EVENT))
}

export function useCarrito() {
  const [carrito, setCarrito] = useState<ItemCarrito[]>(() => leerCarritoLS())

  useEffect(() => {
    const sync = () => setCarrito(leerCarritoLS())
    window.addEventListener(EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  const agregar = useCallback((producto: Producto, cantidad_kg: number) => {
    const next = agregarItem(leerCarritoLS(), producto, cantidad_kg)
    guardarCarritoLS(next)
  }, [])

  const quitar = useCallback((productoId: number) => {
    guardarCarritoLS(quitarItem(leerCarritoLS(), productoId))
  }, [])

  const actualizar = useCallback((productoId: number, cantidad_kg: number) => {
    guardarCarritoLS(actualizarCantidad(leerCarritoLS(), productoId, cantidad_kg))
  }, [])

  const vaciar = useCallback(() => {
    guardarCarritoLS(vaciarCarrito())
  }, [])

  return {
    carrito,
    agregar,
    quitar,
    actualizar,
    vaciar,
    total: calcularTotal(carrito),
    cantidadItems: carrito.length,
  }
}
