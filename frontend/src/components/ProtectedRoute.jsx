import { Navigate } from 'react-router-dom'
import { getToken } from '../services/storage'

export default function ProtectedRoute({ children }) {
  if (!getToken()) {
    return <Navigate to="/login" replace />
  }
  return children
}
