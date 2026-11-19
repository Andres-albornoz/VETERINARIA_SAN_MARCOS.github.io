import { Navigate, useLocation } from 'react-router'
import { useAuth } from './authContext.js'

export default function ProtectedRoute({ children }) {
  const { autenticado } = useAuth()
  const ubicacion = useLocation()

  if (!autenticado) {
    return <Navigate to="/login" replace state={{ desde: ubicacion.pathname }} />
  }

  return children
}
