import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) return (
    <div className="flex min-h-screen items-center justify-center bg-dark">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-dorado border-t-transparent" />
    </div>
  )

  if (!isAuthenticated) return <Navigate to="/admin/login" replace />

  return <>{children}</>
}
