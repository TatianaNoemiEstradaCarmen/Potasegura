import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserPlus, Mail, Lock, User, Store, ShoppingBag } from 'lucide-react'
import AuthLayout from '../../layouts/AuthLayout'
import Alert from '../../components/Alert'
import { setUser } from '../../services/storage'

export default function Register() {
  const navigate = useNavigate()
  const [role, setRole] = useState('vendedor')
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.nombre || !form.email || !form.password || !form.confirmPassword) {
      setError('Completa todos los campos.')
      return
    }
    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden.')
      return
    }

    setUser({ nombre: form.nombre, email: form.email, role })
    navigate('/login')
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-emerald-100 bg-white p-8 shadow-xl">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <UserPlus className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Registro</h1>
          </div>

          <div className="mb-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole('vendedor')}
              className={`flex items-center justify-center gap-2 rounded-lg border-2 px-3 py-3 text-sm font-medium ${
                role === 'vendedor'
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                  : 'border-slate-200 text-slate-600'
              }`}
            >
              <Store className="h-4 w-4" />
              Vendedor
            </button>
            <button
              type="button"
              onClick={() => setRole('cliente')}
              className={`flex items-center justify-center gap-2 rounded-lg border-2 px-3 py-3 text-sm font-medium ${
                role === 'cliente'
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-slate-200 text-slate-600'
              }`}
            >
              <ShoppingBag className="h-4 w-4" />
              Cliente
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {['nombre', 'email', 'password', 'confirmPassword'].map((field) => {
              const labels = {
                nombre: 'Nombre',
                email: 'Correo',
                password: 'Contraseña',
                confirmPassword: 'Confirmar contraseña',
              }
              const Icon = field === 'nombre' ? User : field === 'email' ? Mail : Lock
              return (
                <div key={field}>
                  <label htmlFor={field} className="mb-1.5 block text-sm font-medium text-slate-700">
                    {labels[field]}
                  </label>
                  <div className="relative">
                    <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      id={field}
                      name={field}
                      type={field.includes('password') ? 'password' : field === 'email' ? 'email' : 'text'}
                      value={form[field]}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>
                </div>
              )
            })}

            {error && <Alert type="error">{error}</Alert>}

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Registrarse
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="font-medium text-emerald-600 hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  )
}
