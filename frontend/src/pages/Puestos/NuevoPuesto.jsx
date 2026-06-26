import { useState } from 'react'
import { MapPin, Save, CheckCircle2 } from 'lucide-react'
import DashboardLayout from '../../layouts/DashboardLayout'
import PageHeader from '../../components/PageHeader'
import Alert from '../../components/Alert'
import { generateId, licenciasStore, puestosStore } from '../../services/storage'

export default function NuevoPuesto() {
  const [form, setForm] = useState({
    nombre: '',
    latitud: '',
    longitud: '',
    numeroLicencia: '',
  })
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setSuccess(false)
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.nombre || !form.latitud || !form.longitud || !form.numeroLicencia) {
      setError('Completa todos los campos del puesto.')
      return
    }

    const lat = parseFloat(form.latitud)
    const lng = parseFloat(form.longitud)
    if (Number.isNaN(lat) || Number.isNaN(lng)) {
      setError('Latitud y longitud deben ser números válidos.')
      return
    }

    const puesto = puestosStore.add({
      id: generateId('puesto'),
      nombre: form.nombre,
      latitud: lat,
      longitud: lng,
      numeroLicencia: form.numeroLicencia,
      createdAt: new Date().toISOString(),
    })

    licenciasStore.add({
      id: generateId('lic'),
      puestoId: puesto.id,
      numero: form.numeroLicencia,
      estado: 'activa',
      fechaEmision: new Date().toISOString().slice(0, 10),
      fechaRevocacion: null,
    })

    setSuccess(true)
    setForm({ nombre: '', latitud: '', longitud: '', numeroLicencia: '' })
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-2xl space-y-6">
        <PageHeader
          title="Publicar puesto"
          description="Registra tu puesto de venta con ubicación geográfica y número de licencia."
        />

        <div className="rounded-xl border border-emerald-100 bg-white p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="nombre" className="mb-1.5 block text-sm font-medium text-slate-700">
                Nombre del puesto
              </label>
              <input
                id="nombre"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="latitud" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Latitud
                </label>
                <input
                  id="latitud"
                  name="latitud"
                  value={form.latitud}
                  onChange={handleChange}
                  placeholder="-12.0464"
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
              <div>
                <label htmlFor="longitud" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Longitud
                </label>
                <input
                  id="longitud"
                  name="longitud"
                  value={form.longitud}
                  onChange={handleChange}
                  placeholder="-77.0428"
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>

            <div>
              <label htmlFor="numeroLicencia" className="mb-1.5 block text-sm font-medium text-slate-700">
                Número de licencia
              </label>
              <input
                id="numeroLicencia"
                name="numeroLicencia"
                value={form.numeroLicencia}
                onChange={handleChange}
                placeholder="LIC-POTA-2026-001"
                className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            {error && <Alert type="error">{error}</Alert>}
            {success && (
              <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                <CheckCircle2 className="h-5 w-5" />
                Puesto registrado correctamente.
              </div>
            )}

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              <Save className="h-4 w-4" />
              Guardar
            </button>
          </form>
        </div>

        <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
          <p className="text-sm text-blue-700">
            La ubicación permitirá a los clientes buscar puestos cercanos y verificar el sello
            sanitario.
          </p>
        </div>
      </div>
    </DashboardLayout>
  )
}
