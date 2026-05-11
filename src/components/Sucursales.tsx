import { useState } from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import Map, { Marker, Popup } from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
import { useSucursales } from '../hooks/usePedidos'

// Fallback coordinates si la sucursal aún no tiene lat/lng cargados
const coordsFallback: Record<number, [number, number]> = {
  1: [-68.5017, -32.9282],
  2: [-68.5000, -32.9270],
  3: [-68.5750, -32.9830],
  4: [-68.5780, -32.9800],
  5: [-68.5050, -32.9250],
  6: [-68.5650, -32.9700],
}

export default function Sucursales() {
  const [selected, setSelected] = useState<number | null>(null)
  const { sucursales, loading } = useSucursales()

  const getCoords = (id: number, lng?: number, lat?: number): [number, number] => {
    if (typeof lng === 'number' && typeof lat === 'number') return [lng, lat]
    return coordsFallback[id] ?? [-68.54, -32.95]
  }

  return (
    <section id="sucursales" className="bg-dark-soft py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="mb-4">
              <div className="mb-4 h-[2px] w-12 bg-dorado" />
              <span className="text-[10px] font-medium uppercase tracking-[0.38em] text-dorado/70">Encontranos</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="font-heading text-3xl font-bold text-cream sm:text-4xl lg:text-5xl">
              Nuestras <span className="text-gradient-gold">Sucursales</span>
            </motion.h2>
          </div>
          <p className="max-w-xs text-xs leading-relaxed text-warm">
            {loading ? '—' : sucursales.length} puntos de venta en Mendoza. Carne fresca todos los días. Hacé click en un marcador para ver detalles.
          </p>
        </div>

        {/* Map */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="mt-10 overflow-hidden border border-dark-border" style={{ height: 'clamp(300px, 50vh, 500px)' }}>
          <Map
            initialViewState={{ longitude: -68.54, latitude: -32.955, zoom: 11.5 }}
            style={{ width: '100%', height: '100%' }}
            mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
            attributionControl={false}
          >
            {sucursales.map((suc) => {
              const [lng, lat] = getCoords(suc.id, suc.lng, suc.lat)
              return (
                <Marker key={suc.id} longitude={lng} latitude={lat} anchor="bottom"
                  onClick={(e) => { e.originalEvent.stopPropagation(); setSelected(suc.id) }}>
                  <div className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 transition-all ${
                    selected === suc.id ? 'border-campo bg-campo scale-110' : 'border-campo/60 bg-dark/80'
                  }`}>
                    <div className="h-2 w-2 rounded-full bg-campo-50" />
                  </div>
                </Marker>
              )
            })}

            {selected && (() => {
              const suc = sucursales.find(s => s.id === selected)
              if (!suc) return null
              const [lng, lat] = getCoords(suc.id, suc.lng, suc.lat)
              return (
                <Popup longitude={lng} latitude={lat} anchor="bottom" offset={35}
                  onClose={() => setSelected(null)} closeButton={false}
                  className="[&_.maplibregl-popup-content]:!bg-dark-card [&_.maplibregl-popup-content]:!p-0 [&_.maplibregl-popup-content]:!border [&_.maplibregl-popup-content]:!border-dark-border [&_.maplibregl-popup-tip]:!border-t-dark-card">
                  <div className="p-4 min-w-[200px]">
                    <h3 className="font-heading text-sm font-bold text-cream">{suc.nombre}</h3>
                    <p className="mt-1 text-xs text-warm">{suc.direccion}</p>
                    <p className="text-xs text-warm">{suc.telefono ?? '—'}{suc.horarios ? ` · ${suc.horarios}` : ''}</p>
                    <div className="mt-3 flex gap-2">
                      <Link to={`/sucursal/${suc.id}`}
                        className="text-[10px] font-semibold uppercase tracking-wider text-campo hover:text-campo-light">
                        Ver más →
                      </Link>
                      <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(suc.direccion)}`}
                        target="_blank" rel="noopener noreferrer"
                        className="text-[10px] font-semibold uppercase tracking-wider text-warm hover:text-cream">
                        Google Maps ↗
                      </a>
                    </div>
                  </div>
                </Popup>
              )
            })()}
          </Map>
        </motion.div>

        {/* Sucursal list */}
        <div className="mt-6 grid grid-cols-2 gap-px bg-dark-border sm:grid-cols-3 lg:grid-cols-6">
          {sucursales.map((suc, i) => (
            <motion.div key={suc.id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Link to={`/sucursal/${suc.id}`}
                onMouseEnter={() => setSelected(suc.id)}
                className={`block bg-dark-soft p-4 transition-colors hover:bg-dark-card ${selected === suc.id ? 'bg-dark-card' : ''}`}>
                <span className="text-[10px] text-campo">{String(suc.id).padStart(2, '0')}</span>
                <h4 className="mt-1 font-heading text-xs font-bold text-cream leading-tight">{suc.nombre}</h4>
                <p className="mt-1 text-[10px] text-warm truncate">{suc.telefono ?? ''}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
