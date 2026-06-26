import { useState } from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import DashboardLayout from '../../layouts/DashboardLayout'
import PageHeader from '../../components/PageHeader'
import Alert from '../../components/Alert'
import { generateId, lotesStore, productosStore } from '../../services/storage'

const emptyForm = {
  codigo: '',
  productoId: '',
  cantidadKg: '',
  fechaCaptura: '',
  estado: 'fresco',
}

export default function Lotes() {
  const [items, setItems] = useState(lotesStore.list())
  const [productos] = useState(productosStore.list())
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState(null)

  const refresh = () => setItems(lotesStore.list())
  const getProducto = (id) => productos.find((p) => p.id === id)?.nombre || '—'

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.codigo || !form.productoId || !form.cantidadKg || !form.fechaCaptura) {
      setMessage({ type: 'error', text: 'Completa todos los campos obligatorios.' })
      return
    }

    const data = {
      codigo: form.codigo,
      productoId: form.productoId,
      cantidadKg: parseFloat(form.cantidadKg),
      fechaCaptura: form.fechaCaptura,
      estado: form.estado,
    }

    if (editingId) {
      lotesStore.update(editingId, data)
      setMessage({ type: 'success', text: 'Lote actualizado.' })
    } else {
      lotesStore.add({ id: generateId('lote'), ...data, createdAt: new Date().toISOString() })
      setMessage({ type: 'success', text: 'Lote registrado.' })
    }

    setForm(emptyForm)
    setEditingId(null)
    refresh()
  }

  const handleEdit = (item) => {
    setEditingId(item.id)
    setForm({
      codigo: item.codigo,
      productoId: item.productoId,
      cantidadKg: String(item.cantidadKg),
      fechaCaptura: item.fechaCaptura,
      estado: item.estado,
    })
  }

  const handleDelete = (id) => {
    lotesStore.remove(id)
    refresh()
    setMessage({ type: 'success', text: 'Lote eliminado.' })
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader title="Lotes" description="CRUD de lotes de pota con trazabilidad." />

        <div className="grid gap-6 lg:grid-cols-3">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-xl border border-emerald-100 bg-white p-6 shadow-sm lg:col-span-1"
          >
            <h2 className="font-semibold text-slate-900">
              {editingId ? 'Editar lote' : 'Registrar lote'}
            </h2>
            <input
              placeholder="Código del lote"
              value={form.codigo}
              onChange={(e) => setForm({ ...form, codigo: e.target.value })}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
            <select
              value={form.productoId}
              onChange={(e) => setForm({ ...form, productoId: e.target.value })}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            >
              <option value="">Seleccionar producto</option>
              {productos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nombre}
                </option>
              ))}
            </select>
            <input
              placeholder="Cantidad (kg)"
              type="number"
              step="0.1"
              value={form.cantidadKg}
              onChange={(e) => setForm({ ...form, cantidadKg: e.target.value })}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
            <input
              type="date"
              value={form.fechaCaptura}
              onChange={(e) => setForm({ ...form, fechaCaptura: e.target.value })}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
            <select
              value={form.estado}
              onChange={(e) => setForm({ ...form, estado: e.target.value })}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            >
              <option value="fresco">Fresco</option>
              <option value="congelado">Congelado</option>
            </select>
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
                  <th className="px-4 py-3">Código</th>
                  <th className="px-4 py-3">Producto</th>
                  <th className="px-4 py-3">Kg</th>
                  <th className="px-4 py-3">Captura</th>
                  <th className="px-4 py-3">Estado</th>
                  <th className="px-4 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-slate-50">
                    <td className="px-4 py-3 font-medium">{item.codigo}</td>
                    <td className="px-4 py-3">{getProducto(item.productoId)}</td>
                    <td className="px-4 py-3">{item.cantidadKg}</td>
                    <td className="px-4 py-3">{item.fechaCaptura}</td>
                    <td className="px-4 py-3 capitalize">{item.estado}</td>
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
