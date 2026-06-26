import { useState } from 'react'
import { BadgeCheck, Ban, CheckCircle2 } from 'lucide-react'
import DashboardLayout from '../../layouts/DashboardLayout'
import PageHeader from '../../components/PageHeader'
import Alert from '../../components/Alert'
import { generateId, licenciasStore, puestosStore } from '../../services/storage'

export default function Licencias() {
  const [licencias, setLicencias] = useState(licenciasStore.list())
  const [puestos] = useState(puestosStore.list())
  const [form, setForm] = useState({ puestoId: '', numero: '' })
  const [message, setMessage] = useState(null)

  const refresh = () => setLicencias(licenciasStore.list())
  const getPuesto = (id) => puestos.find((p) => p.id === id)?.nombre || '—'

  const handleEmitir = (e) => {
    e.preventDefault()
    if (!form.puestoId || !form.numero) {
      setMessage({ type: 'error', text: 'Selecciona un puesto e ingresa el número.' })
      return
    }

    licenciasStore.add({
      id: generateId('lic'),
      puestoId: form.puestoId,
      numero: form.numero,
      estado: 'activa',
      fechaEmision: new Date().toISOString().slice(0, 10),
      fechaRevocacion: null,
    })

    setForm({ puestoId: '', numero: '' })
    setMessage({ type: 'success', text: 'Licencia emitida correctamente.' })
    refresh()
  }

  const handleRevocar = (id) => {
    licenciasStore.update(id, {
      estado: 'revocada',
      fechaRevocacion: new Date().toISOString().slice(0, 10),
    })
    setMessage({ type: 'success', text: 'Licencia revocada.' })
    refresh()
  }

  const handleReactivar = (id) => {
    licenciasStore.update(id, {
      estado: 'activa',
      fechaRevocacion: null,
    })
    setMessage({ type: 'success', text: 'Licencia reactivada.' })
    refresh()
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader
          title="Gestión de licencias"
          description="Emitir o revocar licencias sanitarias asociadas a puestos."
        />

        <form
          onSubmit={handleEmitir}
          className="grid gap-4 rounded-xl border border-emerald-100 bg-white p-6 shadow-sm sm:grid-cols-3"
        >
          <select
            value={form.puestoId}
            onChange={(e) => setForm({ ...form, puestoId: e.target.value })}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
          >
            <option value="">Seleccionar puesto</option>
            {puestos.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre}
              </option>
            ))}
          </select>
          <input
            placeholder="Número de licencia"
            value={form.numero}
            onChange={(e) => setForm({ ...form, numero: e.target.value })}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            <BadgeCheck className="h-4 w-4" />
            Emitir licencia
          </button>
        </form>

        {message && <Alert type={message.type}>{message.text}</Alert>}

        <div className="overflow-x-auto rounded-xl border border-emerald-100 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-100 bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3">Puesto</th>
                <th className="px-4 py-3">Número</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Emisión</th>
                <th className="px-4 py-3">Revocación</th>
                <th className="px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {licencias.map((lic) => (
                <tr key={lic.id} className="border-b border-slate-50">
                  <td className="px-4 py-3 font-medium">{getPuesto(lic.puestoId)}</td>
                  <td className="px-4 py-3">{lic.numero}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                        lic.estado === 'activa'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {lic.estado === 'activa' ? (
                        <CheckCircle2 className="h-3 w-3" />
                      ) : (
                        <Ban className="h-3 w-3" />
                      )}
                      {lic.estado}
                    </span>
                  </td>
                  <td className="px-4 py-3">{lic.fechaEmision}</td>
                  <td className="px-4 py-3">{lic.fechaRevocacion || '—'}</td>
                  <td className="px-4 py-3">
                    {lic.estado === 'activa' ? (
                      <button
                        type="button"
                        onClick={() => handleRevocar(lic.id)}
                        className="rounded-lg border border-red-200 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                      >
                        Revocar
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleReactivar(lic.id)}
                        className="rounded-lg border border-emerald-200 px-3 py-1 text-xs font-medium text-emerald-600 hover:bg-emerald-50"
                      >
                        Reactivar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}
