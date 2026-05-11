/**
 * Lógica del carrito — TypeScript puro, sin dependencias.
 * Reusable en componentes React, hooks, y futuro agente IA.
 */

import type { Producto } from '../hooks/useProductos'

export interface ItemCarrito {
  producto: Producto
  cantidad_kg: number
}

const round3 = (n: number) => +n.toFixed(3)

export function agregarItem(carrito: ItemCarrito[], producto: Producto, cantidad_kg: number): ItemCarrito[] {
  if (cantidad_kg <= 0) throw new Error('cantidad_kg debe ser positivo')

  const existe = carrito.find(i => i.producto.id === producto.id)
  if (existe) {
    return carrito.map(i =>
      i.producto.id === producto.id
        ? { ...i, cantidad_kg: round3(i.cantidad_kg + cantidad_kg) }
        : i
    )
  }
  return [...carrito, { producto, cantidad_kg: round3(cantidad_kg) }]
}

export function quitarItem(carrito: ItemCarrito[], productoId: number): ItemCarrito[] {
  return carrito.filter(i => i.producto.id !== productoId)
}

export function actualizarCantidad(carrito: ItemCarrito[], productoId: number, cantidad_kg: number): ItemCarrito[] {
  if (cantidad_kg < 0) throw new Error('cantidad_kg no puede ser negativo')
  if (cantidad_kg === 0) return quitarItem(carrito, productoId)

  return carrito.map(i =>
    i.producto.id === productoId ? { ...i, cantidad_kg: round3(cantidad_kg) } : i
  )
}

export function calcularSubtotal(item: ItemCarrito): number {
  return Math.round(item.producto.precio * item.cantidad_kg)
}

export function calcularTotal(carrito: ItemCarrito[]): number {
  return carrito.reduce((acc, i) => acc + calcularSubtotal(i), 0)
}

export function vaciarCarrito(): ItemCarrito[] {
  return []
}

const fmtPrecio = (n: number) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(n)

export function generarMensajeWhatsApp(
  carrito: ItemCarrito[],
  datos: {
    numero_pedido?: string
    nombre_cliente?: string
    sucursal_nombre?: string
    notas?: string
  } = {}
): string {
  if (carrito.length === 0) throw new Error('El carrito está vacío')

  const { numero_pedido, nombre_cliente, sucursal_nombre, notas } = datos
  const lineas = carrito.map(i => {
    const sub = calcularSubtotal(i)
    return `• ${i.producto.nombre} — ${i.cantidad_kg} kg × ${fmtPrecio(i.producto.precio)}/kg = ${fmtPrecio(sub)}`
  })
  const total = calcularTotal(carrito)

  let msg = `🥩 *Pedido Carnes de Mi Campo*\n`
  if (numero_pedido)   msg += `N° ${numero_pedido}\n`
  if (nombre_cliente)  msg += `Cliente: ${nombre_cliente}\n`
  if (sucursal_nombre) msg += `Sucursal: ${sucursal_nombre}\n`
  msg += `\n${lineas.join('\n')}\n\n*Total: ${fmtPrecio(total)}*`
  if (notas) msg += `\n\nNotas: ${notas}`

  return msg
}

/**
 * Construye la URL de WhatsApp con el mensaje pre-armado.
 * El número debe estar en formato internacional sin '+' (ej: 5492612342674).
 */
export function urlWhatsApp(numeroDestino: string, mensaje: string): string {
  return `https://wa.me/${numeroDestino}?text=${encodeURIComponent(mensaje)}`
}
