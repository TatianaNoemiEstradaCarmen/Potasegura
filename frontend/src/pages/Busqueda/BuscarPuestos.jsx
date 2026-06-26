import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Search, ShieldCheck } from 'lucide-react'
import DashboardLayout from '../../layouts/DashboardLayout'
import PageHeader from '../../components/PageHeader'
import { haversineKm, licenciasStore, puestosStore, seedDemoData } from '../../services/storage'

export default function BuscarPuestos() {
  const [coords, setCoords] = useState({ latitud: '-12.0464', longitud: '-77.0428' })
  const [radio, setRadio] = useState('5')
  const [resultados, setResultados] = useState([])

  useEffect(() => {
    seedDemoData()
  }, [])

  const buscar = (e) => {
    e.preventDefault()
    const lat = parseFloat(coords.latitud)
    const lng = parseFloat(coords.longitud)
    const km = parseFloat(radio)

    if (Number.isNaN(lat) || Number.isNaN(lng)) return

    const licencias = licenciasStore.list()
    const puestos = puestosStore
      .list()
      .map((puesto) => {
        const licencia = licencias.find((l) => l.puestoId === puesto.id)
        const distancia = haversineKm(lat, lng, puesto.latitud, puesto.longitud)
        return { ...puesto, distancia, licenciaActiva: licencia?.estado === 'activa' }
      })
      .filter((p) => p.distancia <= km)
      .sort((a, b) => a.distancia - b.distancia)

    setResultados(puestos)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader
          title="Buscar puestos cercanos"
          description="Encuentra puestos de pota cerca de tu ubicación y verifica su sello sanitario."
        />

        <form
          onSubmit={buscar}
          className="grid gap-4 rounded-xl border border-emerald-100 bg-white p-6 shadow-sm sm:grid-cols-4"
        >
          <input
            placeholder="Tu latitud"
            value={coords.latitud}
            onChange={(e) => setCoords({ ...coords, latitud: e.target.value })}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
          <input
            placeholder="Tu longitud"
            value={coords.longitud}
            onChange={(e) => setCoords({ ...coords, longitud: e.target.value })}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
          <select
            value={radio}
            onChange={(e) => setRadio(e.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
          >
            <option value="2">2 km</option>
            <option value="5">5 km</option>
            <option value="10">10 km</option>
            <option value="25">25 km</option>
          </select>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <Search className="h-4 w-4" />
            Buscar
          </button>
        </form>

        <div className="grid gap-4 md:grid-cols-2">
          {resultados.map((puesto) => (
            <div
              key={puesto.id}
              className="rounded-xl border border-emerald-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900">{puesto.nombre}</h3>
                  <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                    <MapPin className="h-4 w-4" />
                    {puesto.distancia.toFixed(2)} km
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    {puesto.latitud}, {puesto.longitud}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    puesto.licenciaActiva
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {puesto.licenciaActiva ? 'Licencia activa' : 'Sin licencia'}
                </span>
              </div>
              <Link
                to={`/sello/${puesto.id}`}
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline"
              >
                <ShieldCheck className="h-4 w-4" />
                Ver sello sanitario
              </Link>
            </div>
          ))}
          {resultados.length === 0 && (
            <p className="col-span-full rounded-xl border border-dashed border-slate-200 p-8 text-center text-slate-400">
              Ingresa coordenadas y presiona Buscar para ver puestos cercanos.
            </p>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
