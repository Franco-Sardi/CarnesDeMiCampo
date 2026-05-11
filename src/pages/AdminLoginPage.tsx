import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function AdminLoginPage() {
  const { signIn, isAuthenticated, loading } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!loading && isAuthenticated) navigate('/admin', { replace: true })
  }, [isAuthenticated, loading, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await signIn(email, password)
      navigate('/admin', { replace: true })
    } catch {
      setError('Email o contraseña incorrectos.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-dark px-6">
      <div className="w-full max-w-sm">
        {/* Logo / Brand */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 h-[2px] w-10 bg-dorado" />
          <h1 className="font-display text-2xl font-light italic text-cream">
            Carnes de mi Campo
          </h1>
          <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-dorado/50">Panel Admin</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-cream/40">
              Email
            </label>
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border-b border-dark-border bg-transparent pb-2 text-sm text-cream placeholder-cream/20 focus:border-dorado focus:outline-none"
              placeholder="admin@carnesdemicampo.com"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-cream/40">
              Contraseña
            </label>
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border-b border-dark-border bg-transparent pb-2 text-sm text-cream placeholder-cream/20 focus:border-dorado focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-[11px] text-dorado/80">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full cursor-pointer border border-campo bg-campo py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-cream transition-colors hover:bg-campo-light disabled:opacity-50"
          >
            {submitting ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <p className="mt-8 text-center text-[9px] text-cream/15 uppercase tracking-widest">
          Acceso restringido
        </p>
      </div>
    </div>
  )
}
