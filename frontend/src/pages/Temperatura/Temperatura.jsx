import { useState } from 'react'
import { Thermometer, Plus, Trash2 } from 'lucide-react'
import DashboardLayout from '../../layouts/DashboardLayout'
import PageHeader from '../../components/PageHeader'
import Alert from '../../components/Alert'
import { generateId, lotesStore, temperaturasStore } from '../../services/storage'

const emptyForm = { loteId: '', valor: '', observacion: '' }

export default function Temperatura() {
  const [registros, setRegistros] = useState(temperaturasStore.list())
  const [lotes] = useState(lotesStore.list())
  const [form, setForm] = useState(emptyForm)
  const [message, setMessage] = useState(null)

  const refresh = () => setRegistros(temperaturasStore.list())
  const getLote = (id) => lotes.find((l) => l.id === id)?.codigo || '—'

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.loteId || !form.valor) {
      setMessage({ type: 'error', text: 'Selecciona un lote e ingresa la temperatura.' })
      return
    }

    const valor = parseFloat(form.valor)
    if (Number.isNaN(valor)) {
      setMessage({ type: 'error', text: 'Temperatura inválida.' })
      return
    }

    temperaturasStore.add({
      id: generateId('temp'),
      loteId: form.loteId,
      valor,
      fechaHora: new Date().toISOString(),
      observacion: form.observacion,
    })

    setForm(emptyForm)
    setMessage({ type: 'success', text: 'Temperatura registrada correctamente.' })
    refresh()
  }

  const handleDelete = (id) => {
    temperaturasStore.remove(id)
    refresh()
  }

  const isSafe = (valor) => valor >= -2 && valor <= 4

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader
          title="Registro de temperatura"
          description="Control de cadena de frío por lote (rango seguro: -2°C a 4°C)."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-xl border border-emerald-100 bg-white p-6 shadow-sm lg:col-span-1"
          >
            <h2 className="flex items-center gap-2 font-semibold text-slate-900">
              <Thermometer className="h-5 w-5 text-blue-600" />
              Nueva lectura
            </h2>
            <select
              value={form.loteId}
              onChange={(e) => setForm({ ...form, loteId: e.target.value })}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            >
              <option value="">Seleccionar lote</option>
              {lotes.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.codigo}
                </option>
              ))}
            </select>
            <input
              placeholder="Temperatura (°C)"
              type="number"
              step="0.1"
              value={form.valor}
              onChange={(e) => setForm({ ...form, valor: e.target.value })}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
            <textarea
              placeholder="Observación"
              value={form.observacion}
              onChange={(e) => setForm({ ...form, observacion: e.target.value })}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              rows={3}
            />
            {message && <Alert type={message.type}>{message.text}</Alert>}
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              Registrar
            </button>
          </form>

          <div className="overflow-x-auto rounded-xl border border-emerald-100 bg-white shadow-sm lg:col-span-2">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-100 bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3">Lote</th>
                  <th className="px-4 py-3">Temperatura</th>
                  <th className="px-4 py-3">Estado</th>
                  <th className="px-4 py-3">Fecha</th>
                  <th className="px-4 py-3">Observación</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {registros.map((r) => (
                  <tr key={r.id} className="border-b border-slate-50">
                    <td className="px-4 py-3 font-medium">{getLote(r.loteId)}</td>
                    <td className="px-4 py-3">{r.valor}°C</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          isSafe(r.valor)
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {isSafe(r.valor) ? 'Seguro' : 'Alerta'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {new Date(r.fechaHora).toLocaleString('es-PE')}
                    </td>
                    <td className="px-4 py-3 text-slate-500">{r.observacion || '—'}</td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => handleDelete(r.id)}
                        className="rounded p-1 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
