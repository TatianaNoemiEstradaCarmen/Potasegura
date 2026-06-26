import { Link } from 'react-router-dom'
import { ShieldCheck, Menu, X, LogOut } from 'lucide-react'
import { clearSession } from '../services/storage'

export default function Navbar({ onMenuToggle, sidebarOpen, variant = 'public' }) {
  const handleLogout = () => {
    clearSession()
    window.location.href = '/login'
  }

  return (
    <header className="sticky top-0 z-40 border-b border-emerald-100 bg-white/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-3">
          {onMenuToggle && (
            <button
              type="button"
              onClick={onMenuToggle}
              className="rounded-lg p-2 text-blue-600 hover:bg-blue-50 lg:hidden"
              aria-label="Abrir menú"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          )}
          <Link
            to={variant === 'dashboard' ? '/dashboard' : '/'}
            className="flex items-center gap-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-blue-600">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-blue-700">PotaSegura</span>
          </Link>
        </div>

        {variant === 'dashboard' ? (
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Cerrar sesión</span>
          </button>
        ) : (
          <nav className="hidden items-center gap-3 sm:flex">
            <Link
              to="/login"
              className="rounded-lg px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/register"
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
            >
              Registrarse
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
