import { motion } from 'motion/react'
import { useForm } from 'react-hook-form'

interface FormData { nombre: string; telefono: string; email: string; comentario: string }

export default function Contacto() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>()
  const onSubmit = (data: FormData) => { console.log(data); alert('Mensaje enviado!'); reset() }

  return (
    <section id="contacto" className="relative overflow-hidden bg-dark py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="mb-3 flex items-center gap-3">
              <div className="h-px w-10 bg-campo" />
              <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-campo">Contacto</span>
            </div>
            <h2 className="font-heading text-3xl font-bold text-cream sm:text-4xl lg:text-5xl">
              Quiero que<br /><span className="text-campo">me contacten</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-warm">
              Contanos en qué podemos ayudarte. Intentaremos responderte lo antes posible.
            </p>
            <div className="mt-8 space-y-3 text-sm text-cream/40">
              <p>ventas@carnesdemicampo.com.ar</p>
              <p>+54 9 261 640-1013</p>
              <p>Elpidio González 320, Dorrego - Guaymallén, Mendoza</p>
            </div>
            <a href="https://wa.me/5492616401013?text=Hola!%20Quiero%20hacer%20un%20pedido"
              target="_blank" rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2.5 border border-[#25D366]/20 bg-[#25D366]/5 px-5 py-2.5 text-xs font-medium text-[#25D366] transition-all hover:bg-[#25D366]/15">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}
            className="border border-dark-border bg-dark-card p-6 sm:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {[
                { name: 'nombre' as const, ph: 'Nombre', req: true, type: 'text' },
                { name: 'telefono' as const, ph: 'Teléfono', req: false, type: 'tel' },
                { name: 'email' as const, ph: 'Email', req: true, type: 'email' },
              ].map(f => (
                <div key={f.name}>
                  <input type={f.type} placeholder={f.ph}
                    {...register(f.name, f.req ? { required: 'Requerido' } : {})}
                    className="w-full border-0 border-b border-dark-border bg-transparent pb-3 text-sm text-cream placeholder-cream/25 transition-colors focus:border-campo focus:outline-none" />
                  {errors[f.name] && <p className="mt-1 text-[10px] text-campo">{errors[f.name]?.message}</p>}
                </div>
              ))}
              <div>
                <textarea rows={3} placeholder="Comentario"
                  {...register('comentario', { required: 'Requerido' })}
                  className="w-full resize-none border-0 border-b border-dark-border bg-transparent pb-3 text-sm text-cream placeholder-cream/25 transition-colors focus:border-campo focus:outline-none" />
                {errors.comentario && <p className="mt-1 text-[10px] text-campo">{errors.comentario?.message}</p>}
              </div>
              <button type="submit"
                className="group flex w-full items-center justify-between border border-campo bg-campo px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-cream transition-all hover:bg-campo-light">
                Enviar
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  className="transition-transform group-hover:translate-x-1"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
