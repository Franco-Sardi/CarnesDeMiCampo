import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import CowDiagram, { cuts } from '../components/CowDiagram'
import { createProducto, updateProducto, useProducto } from '../hooks/useProductos'
import { uploadProductImage } from '../lib/supabase'

type FormValues = {
  nombre: string
  corte: string
  precio: number
  precio_ant: number | ''
  badge: string
  descripcion: string
  ubicacion: string
  pedido: string
  coccion: string
  ideal_para: string
  historia: string
  pro_tip: string
  es_oferta: boolean
  activo: boolean
}

const METODOS_OPTS = ['Parrilla', 'Plancha', 'Sartén', 'Horno', 'Estofado', 'Relleno', 'Frío']

export default function AdminProductoForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id
  const { producto } = useProducto(Number(id))

  const { register, handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    defaultValues: {
      nombre: '', corte: '', precio: 0, precio_ant: '', badge: '',
      descripcion: '', ubicacion: '', pedido: '', coccion: '',
      ideal_para: '', historia: '', pro_tip: '',
      es_oferta: false, activo: true,
    }
  })

  // State for array fields and cow selector
  const [nombresAlt, setNombresAlt] = useState<string[]>([])
  const [metodos, setMetodos] = useState<string[]>([])
  const [cutId, setCutId] = useState<string | undefined>(undefined)
  const [imagen, setImagen] = useState('')
  const [imageTab, setImageTab] = useState<'url' | 'upload'>('url')
  const [uploading, setUploading] = useState(false)
  const [submitError, setSubmitError] = useState('')

  // Populate form when editing
  useEffect(() => {
    if (isEdit && producto) {
      reset({
        nombre: producto.nombre,
        corte: producto.corte,
        precio: producto.precio,
        precio_ant: producto.precio_ant ?? '',
        badge: producto.badge ?? '',
        descripcion: producto.descripcion,
        ubicacion: producto.ubicacion,
        pedido: producto.pedido,
        coccion: producto.coccion,
        ideal_para: producto.ideal_para,
        historia: producto.historia,
        pro_tip: producto.pro_tip,
        es_oferta: producto.es_oferta,
        activo: producto.activo,
      })
      setNombresAlt(producto.nombres_alt ?? [])
      setMetodos(producto.metodos ?? [])
      setCutId(producto.cut_id ?? undefined)
      setImagen(producto.imagen ?? '')
    }
  }, [producto, isEdit, reset])

  const handleImageUpload = async (file: File) => {
    setUploading(true)
    try {
      const url = await uploadProductImage(file)
      setImagen(url)
    } catch {
      setSubmitError('Error al subir imagen. Intentá de nuevo.')
    } finally {
      setUploading(false)
    }
  }

  const onSubmit = async (data: FormValues) => {
    setSubmitError('')
    const payload = {
      ...data,
      precio: Number(data.precio),
      precio_ant: data.precio_ant ? Number(data.precio_ant) : undefined,
      imagen,
      nombres_alt: nombresAlt,
      metodos,
      cut_id: cutId ?? undefined,
    }
    try {
      if (isEdit && id) {
        await updateProducto(Number(id), payload)
      } else {
        await createProducto(payload as Parameters<typeof createProducto>[0])
      }
      navigate('/admin')
    } catch (e: unknown) {
      setSubmitError(e instanceof Error ? e.message : 'Error al guardar.')
    }
  }

  const addNombreAlt = () => setNombresAlt(p => [...p, ''])
  const removeNombreAlt = (i: number) => setNombresAlt(p => p.filter((_, idx) => idx !== i))
  const updateNombreAlt = (i: number, val: string) =>
    setNombresAlt(p => p.map((x, idx) => idx === i ? val : x))

  const toggleMetodo = (m: string) =>
    setMetodos(p => p.includes(m) ? p.filter(x => x !== m) : [...p, m])

  return (
    <div className="min-h-screen bg-dark">
      {/* Header */}
      <header className="border-b border-dark-border bg-dark-soft px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <p className="text-[9px] uppercase tracking-[0.3em] text-dorado/50">Panel Admin</p>
            <h1 className="font-display text-lg font-light italic text-cream">
              {isEdit ? 'Editar Producto' : 'Nuevo Producto'}
            </h1>
          </div>
          <Link to="/admin" className="text-[10px] uppercase tracking-wider text-cream/30 hover:text-cream">
            ← Volver
          </Link>
        </div>
      </header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">

            {/* ── LEFT: formulario ── */}
            <div className="space-y-8">

              {/* Sección: Básico */}
              <div className="border border-dark-border bg-dark-card p-6">
                <h2 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-dorado/60">
                  Información básica
                </h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="field-label">Nombre del corte *</label>
                    <input {...register('nombre', { required: 'Requerido' })}
                      className="field-input" placeholder="Bife de Chorizo" />
                    {errors.nombre && <p className="field-error">{errors.nombre.message}</p>}
                  </div>

                  <div>
                    <label className="field-label">Categoría</label>
                    <input {...register('corte')} className="field-input" placeholder="Novillo Premium" />
                  </div>

                  <div>
                    <label className="field-label">Badge (opcional)</label>
                    <input {...register('badge')} className="field-input" placeholder="Premium / Popular / -20%" />
                  </div>

                  <div>
                    <label className="field-label">Precio (ARS) *</label>
                    <input type="number" {...register('precio', { required: 'Requerido', min: 1 })}
                      className="field-input" placeholder="8500" />
                    {errors.precio && <p className="field-error">{errors.precio.message}</p>}
                  </div>

                  <div>
                    <label className="field-label">Precio anterior (tachado)</label>
                    <input type="number" {...register('precio_ant')}
                      className="field-input" placeholder="Dejar vacío si no hay" />
                  </div>

                  <div className="sm:col-span-2 flex flex-wrap gap-6">
                    <label className="flex cursor-pointer items-center gap-2.5">
                      <Controller name="es_oferta" control={control}
                        render={({ field }) => (
                          <input type="checkbox" checked={field.value}
                            onChange={e => field.onChange(e.target.checked)}
                            className="h-4 w-4 accent-dorado" />
                        )} />
                      <span className="text-[11px] text-cream/60">Marcar como oferta</span>
                    </label>
                    <label className="flex cursor-pointer items-center gap-2.5">
                      <Controller name="activo" control={control}
                        render={({ field }) => (
                          <input type="checkbox" checked={field.value}
                            onChange={e => field.onChange(e.target.checked)}
                            className="h-4 w-4 accent-campo" />
                        )} />
                      <span className="text-[11px] text-cream/60">Producto activo</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Sección: Nombres alternativos */}
              <div className="border border-dark-border bg-dark-card p-6">
                <h2 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-dorado/60">
                  Nombres alternativos
                </h2>
                <div className="space-y-2">
                  {nombresAlt.map((n, i) => (
                    <div key={i} className="flex gap-2">
                      <input value={n} onChange={e => updateNombreAlt(i, e.target.value)}
                        className="field-input flex-1" placeholder="NY Strip" />
                      <button type="button" onClick={() => removeNombreAlt(i)}
                        className="cursor-pointer px-2 text-cream/30 hover:text-red-400">✕</button>
                    </div>
                  ))}
                  <button type="button" onClick={addNombreAlt}
                    className="mt-1 cursor-pointer text-[10px] uppercase tracking-wider text-dorado/50 hover:text-dorado">
                    + Agregar nombre
                  </button>
                </div>
              </div>

              {/* Sección: Descripción y detalle */}
              <div className="border border-dark-border bg-dark-card p-6">
                <h2 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-dorado/60">
                  Descripción y detalle
                </h2>
                <div className="space-y-5">
                  <div>
                    <label className="field-label">Descripción corta</label>
                    <textarea {...register('descripcion')} rows={2}
                      className="field-input resize-none" placeholder="El corte insignia del asado argentino..." />
                  </div>
                  <div>
                    <label className="field-label">Ubicación anatómica</label>
                    <textarea {...register('ubicacion')} rows={2}
                      className="field-input resize-none" placeholder="Región dorso-lumbar. Músculo longissimus dorsi..." />
                  </div>
                  <div>
                    <label className="field-label">Cómo pedirlo</label>
                    <textarea {...register('pedido')} rows={2}
                      className="field-input resize-none" placeholder="Pedilo deshuesado, de 2 dedos de espesor..." />
                  </div>
                  <div>
                    <label className="field-label">Cocción recomendada</label>
                    <textarea {...register('coccion')} rows={2}
                      className="field-input resize-none" placeholder="Parrilla a brasa media-alta..." />
                  </div>
                  <div>
                    <label className="field-label">Ideal para</label>
                    <input {...register('ideal_para')} className="field-input"
                      placeholder="Asado del domingo, cena especial..." />
                  </div>
                  <div>
                    <label className="field-label">Historia del corte</label>
                    <textarea {...register('historia')} rows={3}
                      className="field-input resize-none" placeholder="Se llama así porque..." />
                  </div>
                  <div>
                    <label className="field-label">Pro tip del asador</label>
                    <textarea {...register('pro_tip')} rows={2}
                      className="field-input resize-none" placeholder="Nunca le saques la grasa..." />
                  </div>
                </div>
              </div>

              {/* Sección: Métodos de cocción */}
              <div className="border border-dark-border bg-dark-card p-6">
                <h2 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-dorado/60">
                  Métodos de cocción
                </h2>
                <div className="flex flex-wrap gap-2">
                  {METODOS_OPTS.map(m => (
                    <button key={m} type="button" onClick={() => toggleMetodo(m)}
                      className={`cursor-pointer border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                        metodos.includes(m)
                          ? 'border-campo bg-campo/15 text-campo'
                          : 'border-dark-border text-cream/30 hover:border-cream/20 hover:text-cream/50'
                      }`}>
                      {m}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* ── RIGHT: imagen + vaca ── */}
            <div className="space-y-6">

              {/* Imagen */}
              <div className="border border-dark-border bg-dark-card p-5">
                <h2 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-dorado/60">
                  Imagen
                </h2>

                {/* Preview */}
                {imagen ? (
                  <div className="relative mb-4 aspect-square overflow-hidden border border-dark-border">
                    <img src={imagen} alt="preview" className="h-full w-full object-cover" />
                    <button type="button" onClick={() => setImagen('')}
                      className="absolute right-2 top-2 cursor-pointer bg-dark/80 px-2 py-1 text-[9px] text-cream/60 hover:text-cream">
                      ✕
                    </button>
                  </div>
                ) : (
                  <div className="mb-4 flex aspect-square items-center justify-center border border-dashed border-dark-border">
                    <span className="text-[11px] text-cream/20">Sin imagen</span>
                  </div>
                )}

                {/* Tabs */}
                <div className="mb-3 flex border-b border-dark-border">
                  {(['url', 'upload'] as const).map(tab => (
                    <button key={tab} type="button" onClick={() => setImageTab(tab)}
                      className={`cursor-pointer px-4 pb-2 text-[10px] uppercase tracking-wider transition-colors ${
                        imageTab === tab ? 'border-b border-dorado text-dorado' : 'text-cream/30 hover:text-cream'
                      }`}>
                      {tab === 'url' ? 'URL' : 'Subir archivo'}
                    </button>
                  ))}
                </div>

                {imageTab === 'url' ? (
                  <input value={imagen} onChange={e => setImagen(e.target.value)}
                    className="field-input w-full" placeholder="https://..." />
                ) : (
                  <label className="flex cursor-pointer flex-col items-center gap-2 border border-dashed border-dark-border py-6 transition-colors hover:border-dorado/40">
                    <span className="text-[11px] text-cream/40">
                      {uploading ? 'Subiendo...' : 'Clic o arrastrá un archivo'}
                    </span>
                    <input type="file" accept="image/*" className="hidden"
                      onChange={e => { const f = e.target.files?.[0]; if (f) handleImageUpload(f) }} />
                  </label>
                )}
              </div>

              {/* Diagrama de la vaca */}
              <div className="border border-dark-border bg-dark-card p-5">
                <h2 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-dorado/60">
                  Zona del corte en la vaca
                </h2>
                <CowDiagram
                  mode="selector"
                  selectedCut={cutId}
                  onSelect={id => setCutId(prev => prev === id ? undefined : id)}
                />
                {cutId && (
                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-[10px] text-cream/40">
                      {cuts.find(c => c.id === cutId)?.description}
                    </p>
                    <button type="button" onClick={() => setCutId(undefined)}
                      className="cursor-pointer text-[9px] text-cream/25 hover:text-cream">
                      Quitar
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Submit */}
          {submitError && (
            <p className="mt-4 text-sm text-dorado/80">{submitError}</p>
          )}
          <div className="mt-6 flex gap-4">
            <button type="submit" disabled={isSubmitting || uploading}
              className="cursor-pointer border border-campo bg-campo px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-cream transition-colors hover:bg-campo-light disabled:opacity-50">
              {isSubmitting ? 'Guardando...' : isEdit ? 'Guardar cambios' : 'Crear producto'}
            </button>
            <Link to="/admin"
              className="cursor-pointer border border-dark-border px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-cream/40 transition-colors hover:border-cream/20 hover:text-cream">
              Cancelar
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}
