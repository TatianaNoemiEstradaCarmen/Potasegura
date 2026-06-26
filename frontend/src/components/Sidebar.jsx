import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Store,
  Package,
  Layers,
  Thermometer,
  ClipboardCheck,
  BadgeCheck,
  Search,
  ShieldCheck,
} from 'lucide-react'

const menuItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/puestos/nuevo', label: 'Mi Puesto', icon: Store },
  { to: '/productos', label: 'Productos', icon: Package },
  { to: '/lotes', label: 'Lotes', icon: Layers },
  { to: '/temperatura', label: 'Temperatura', icon: Thermometer },
  { to: '/inspecciones', label: 'Inspecciones', icon: ClipboardCheck },
  { to: '/licencias', label: 'Licencias', icon: BadgeCheck },
  { to: '/buscar-puestos', label: 'Buscar puestos', icon: Search },
]

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
          onClick={onClose}
          aria-label="Cerrar menú"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-emerald-100 bg-white transition-transform duration-300 lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center gap-2 border-b border-emerald-100 px-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-blue-600">
            <ShieldCheck className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-blue-700">PotaSegura</p>
            <p className="text-xs text-slate-500">Panel vendedor</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {menuItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-slate-600 hover:bg-blue-50 hover:text-blue-700'
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}
