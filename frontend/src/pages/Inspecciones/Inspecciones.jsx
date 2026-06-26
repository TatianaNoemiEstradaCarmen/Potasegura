import { useState } from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import DashboardLayout from '../../layouts/DashboardLayout'
import PageHeader from '../../components/PageHeader'
import Alert from '../../components/Alert'
import { generateId, inspeccionesStore, lotesStore } from '../../services/storage'

const emptyForm = {
  loteId: '',
  inspector: '',
  resultado: 'aprobado',
  observaciones: '',
  fecha: '',
}

export default function Inspecciones() {
  const [items, setItems] = useState(inspeccionesStore.list())
  const [lotes] = useState(lotesStore.list())
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState(null)

  const refresh = () => setItems(inspeccionesStore.list())
  const getLote = (id) => lotes.find((l) => l.id === id)?.codigo || '—'

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.loteId || !form.inspector || !form.fecha) {
      setMessage({ type: 'error', text: 'Completa lote, inspector y fecha.' })
      return
    }

    const data = { ...form }

    if (editingId) {
      inspeccionesStore.update(editingId, data)
      setMessage({ type: 'success', text: 'Inspección actualizada.' })
    } else {
      inspeccionesStore.add({
        id: generateId('insp'),
        ...data,
        createdAt: new Date().toISOString(),
      })
      setMessage({ type: 'success', text: 'Inspección registrada.' })
    }

    setForm(emptyForm)
    setEditingId(null)
    refresh()
  }

  const handleEdit = (item) => {
    setEditingId(item.id)
    setForm({
      loteId: item.loteId,
      inspector: item.inspector,
      resultado: item.resultado,
      observaciones: item.observaciones || '',
      fecha: item.fecha,
    })
  }

  const handleDelete = (id) => {
    inspeccionesStore.remove(id)
    refresh()
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader title="Inspecciones" description="CRUD de inspecciones sanitarias por lote." />

        <div className="grid gap-6 lg:grid-cols-3">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-xl border border-emerald-100 bg-white p-6 shadow-sm lg:col-span-1"
          >
            <h2 className="font-semibold text-slate-900">
              {editingId ? 'Editar inspección' : 'Nueva inspección'}
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
              placeholder="Inspector"
              value={form.inspector}
              onChange={(e) => setForm({ ...form, inspector: e.target.value })}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
            <select
              value={form.resultado}
              onChange={(e) => setForm({ ...form, resultado: e.target.value })}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            >
              <option value="aprobado">Aprobado</option>
              <option value="rechazado">Rechazado</option>
            </select>
            <input
              type="date"
              value={form.fecha}
              onChange={(e) => setForm({ ...form, fecha: e.target.value })}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
            <textarea
              placeholder="Observaciones"
              value={form.observaciones}
              onChange={(e) => setForm({ ...form, observaciones: e.target.value })}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              rows={3}
            />
            {message && <Alert type={message.type}>{message.text}</Alert>}
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              <Plus className="h-4 w-4" />
              {editingId ? 'Actualizar' : 'Guardar'}
            </button>
          </form>

          <div className="overflow-x-auto rounded-xl border border-emerald-100 bg-white shadow-sm lg:col-span-2">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-100 bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3">Lote</th>
                  <th className="px-4 py-3">Inspector</th>
                  <th className="px-4 py-3">Resultado</th>
                  <th className="px-4 py-3">Fecha</th>
                  <th className="px-4 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-slate-50">
                    <td className="px-4 py-3 font-medium">{getLote(item.loteId)}</td>
                    <td className="px-4 py-3">{item.inspector}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                          item.resultado === 'aprobado'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {item.resultado}
                      </span>
                    </td>
                    <td className="px-4 py-3">{item.fecha}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(item)}
                          className="rounded p-1 text-blue-600 hover:bg-blue-50"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="rounded p-1 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
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
