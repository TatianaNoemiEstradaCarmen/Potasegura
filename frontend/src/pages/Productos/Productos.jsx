import { useState } from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import DashboardLayout from '../../layouts/DashboardLayout'
import PageHeader from '../../components/PageHeader'
import Alert from '../../components/Alert'
import { generateId, productosStore } from '../../services/storage'

const emptyForm = { nombre: '', descripcion: '', precioKg: '' }

export default function Productos() {
  const [items, setItems] = useState(productosStore.list())
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState(null)

  const refresh = () => setItems(productosStore.list())

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.nombre || !form.precioKg) {
      setMessage({ type: 'error', text: 'Nombre y precio son obligatorios.' })
      return
    }

    const data = {
      nombre: form.nombre,
      descripcion: form.descripcion,
      precioKg: parseFloat(form.precioKg),
    }

    if (editingId) {
      productosStore.update(editingId, data)
      setMessage({ type: 'success', text: 'Producto actualizado.' })
    } else {
      productosStore.add({ id: generateId('producto'), ...data, createdAt: new Date().toISOString() })
      setMessage({ type: 'success', text: 'Producto registrado.' })
    }

    setForm(emptyForm)
    setEditingId(null)
    refresh()
  }

  const handleEdit = (item) => {
    setEditingId(item.id)
    setForm({
      nombre: item.nombre,
      descripcion: item.descripcion || '',
      precioKg: String(item.precioKg),
    })
  }

  const handleDelete = (id) => {
    productosStore.remove(id)
    refresh()
    setMessage({ type: 'success', text: 'Producto eliminado.' })
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader
          title="Productos"
          description="CRUD de productos de pota disponibles en tu puesto."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-xl border border-emerald-100 bg-white p-6 shadow-sm lg:col-span-1"
          >
            <h2 className="font-semibold text-slate-900">
              {editingId ? 'Editar producto' : 'Nuevo producto'}
            </h2>
            <input
              placeholder="Nombre"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
            <textarea
              placeholder="Descripción"
              value={form.descripcion}
              onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              rows={3}
            />
            <input
              placeholder="Precio por kg"
              type="number"
              step="0.01"
              value={form.precioKg}
              onChange={(e) => setForm({ ...form, precioKg: e.target.value })}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
            {message && <Alert type={message.type}>{message.text}</Alert>}
            <div className="flex gap-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                <Plus className="h-4 w-4" />
                {editingId ? 'Actualizar' : 'Guardar'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null)
                    setForm(emptyForm)
                  }}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>

          <div className="overflow-hidden rounded-xl border border-emerald-100 bg-white shadow-sm lg:col-span-2">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-100 bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3">Nombre</th>
                  <th className="px-4 py-3">Descripción</th>
                  <th className="px-4 py-3">Precio/kg</th>
                  <th className="px-4 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-slate-50">
                    <td className="px-4 py-3 font-medium">{item.nombre}</td>
                    <td className="px-4 py-3 text-slate-500">{item.descripcion || '—'}</td>
                    <td className="px-4 py-3">S/ {item.precioKg.toFixed(2)}</td>
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
                {items.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-slate-400">
                      No hay productos registrados
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
