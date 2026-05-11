import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'motion/react'
import Map, { Marker } from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
import { supabase } from '../lib/supabase'
import type { Sucursal } from '../hooks/usePedidos'

const coordsFallback: Record<number, [number, number]> = {
  1: [-68.5017, -32.9282],
  2: [-68.5000, -32.9270],
  3: [-68.5750, -32.9830],
  4: [-68.5780, -32.9800],
  5: [-68.5050, -32.9250],
  6: [-68.5650, -32.9700],
}

export default function SucursalPage() {
  const { id } = useParams()
  const [suc, setSuc] = useState<Sucursal | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    supabase
      .from('sucursales')
      .select('*')
      .eq('id', Number(id))
      .eq('activa', true)
      .maybeSingle()
      .then(({ data }) => {
        setSuc(data)
        setLoading(false)
      })
  }, [id])

  if (loading) return (
    <div className="flex min-h-screen items-center justify-center bg-dark">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-dorado border-t-transparent" />
    </div>
  )

  if (!suc) return (
    <div className="flex min-h-screen items-center justify-center bg-dark">
      <div className="text-center">
        <h1 className="font-heading text-3xl text-cream">Sucursal no encontrada</h1>
        <Link to="/" className="mt-4 inline-block text-sm text-campo hover:text-campo-light">← Volver al inicio</Link>
      </div>
    </div>
  )

  const lng = suc.lng ?? coordsFallback[suc.id]?.[0] ?? -68.54
  const lat = suc.lat ?? coordsFallback[suc.id]?.[1] ?? -32.95
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(suc.direccion)}`
  const telDigits = (suc.telefono ?? '').replace(/[^0-9]/g, '')

  return (
    <div className="min-h-screen bg-dark pt-20">
      {/* Map hero */}
      <div className="relative h-[40vh] sm:h-[50vh]">
        <Link to="/#sucursales"
          className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full border border-cream/15 bg-dark/70 px-3 py-1.5 text-[11px] text-cream/70 backdrop-blur-sm transition-colors hover:bg-dark hover:text-cream">
          ← Volver a sucursales
        </Link>
        <Map initialViewState={{ longitude: lng, latitude: lat, zoom: 14 }}
          style={{ width: '100%', height: '100%' }}
          mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
          attributionControl={false}>
          <Marker longitude={lng} latitude={lat} anchor="bottom">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-campo bg-campo/20 shadow-lg shadow-campo/20">
              <div className="h-3 w-3 rounded-full bg-campo-50" />
            </div>
          </Marker>
        </Map>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-5 py-12 sm:px-6 sm:py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="font-heading text-5xl font-light text-dark-border">{String(suc.id).padStart(2, '0')}</span>
          <h1 className="mt-2 font-heading text-3xl font-bold text-cream sm:text-4xl">{suc.nombre}</h1>
          <div className="mt-1 h-px w-16 bg-campo" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="space-y-4">
            <div>
              <h3 className="text-[10px] font-medium uppercase tracking-[0.2em] text-campo">Dirección</h3>
              <p className="mt-1 text-sm text-cream/70">{suc.direccion}</p>
            </div>
            {suc.telefono && (
              <div>
                <h3 className="text-[10px] font-medium uppercase tracking-[0.2em] text-campo">Teléfono</h3>
                <p className="mt-1 text-sm text-cream/70">{suc.telefono}</p>
              </div>
            )}
            {suc.horarios && (
              <div>
                <h3 className="text-[10px] font-medium uppercase tracking-[0.2em] text-campo">Horario</h3>
                <p className="mt-1 text-sm text-cream/70">{suc.horarios}</p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-campo bg-campo px-6 py-3 text-xs font-semibold uppercase tracking-wider text-cream transition-all hover:bg-campo-light">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              Cómo llegar
            </a>
            {(suc.whatsapp || telDigits) && (
              <a href={`https://wa.me/${suc.whatsapp ?? `54${telDigits}`}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-[#25D366]/20 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#25D366] transition-all hover:bg-[#25D366]/10">
                WhatsApp
              </a>
            )}
            {telDigits && (
              <a href={`tel:+54${telDigits}`}
                className="flex items-center justify-center gap-2 border border-dark-border px-6 py-3 text-xs font-semibold uppercase tracking-wider text-cream/50 transition-all hover:border-cream/30 hover:text-cream">
                Llamar
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
