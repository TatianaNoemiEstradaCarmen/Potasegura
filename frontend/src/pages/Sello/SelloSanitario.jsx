import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  BadgeCheck,
  ClipboardCheck,
  ShieldCheck,
  Thermometer,
} from 'lucide-react'
import DashboardLayout from '../../layouts/DashboardLayout'
import {
  inspeccionesStore,
  licenciasStore,
  lotesStore,
  puestosStore,
  seedDemoData,
  temperaturasStore,
} from '../../services/storage'

export default function SelloSanitario() {
  const { puestoId } = useParams()
  const [data, setData] = useState(null)

  useEffect(() => {
    seedDemoData()

    const puesto = puestosStore.find(puestoId)
    if (!puesto) {
      setData(null)
      return
    }

    const licencia = licenciasStore
      .list()
      .find((l) => l.puestoId === puestoId && l.estado === 'activa')

    const lotes = lotesStore.list()
    const inspecciones = inspeccionesStore.list()
    const temperaturas = temperaturasStore.list()

    const ultimaInspeccion = inspecciones
      .filter((i) => lotes.some((l) => l.id === i.loteId))
      .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))[0]

    const ultimaTemp = temperaturas.sort(
      (a, b) => new Date(b.fechaHora) - new Date(a.fechaHora),
    )[0]

    const tempSegura = ultimaTemp ? ultimaTemp.valor >= -2 && ultimaTemp.valor <= 4 : false
    const selloValido =
      licencia && ultimaInspeccion?.resultado === 'aprobado' && tempSegura

    setData({ puesto, licencia, ultimaInspeccion, ultimaTemp, tempSegura, selloValido })
  }, [puestoId])

  if (!data) {
    return (
      <DashboardLayout>
        <div className="rounded-xl border border-red-100 bg-red-50 p-8 text-center">
          <p className="text-red-700">Puesto no encontrado.</p>
          <Link to="/buscar-puestos" className="mt-4 inline-block text-blue-600 hover:underline">
            Volver a búsqueda
          </Link>
        </div>
      </DashboardLayout>
    )
  }

  const { puesto, licencia, ultimaInspeccion, ultimaTemp, tempSegura, selloValido } = data

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-lg space-y-6">
        <Link
          to="/buscar-puestos"
          className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a búsqueda
        </Link>

        <div
          className={`overflow-hidden rounded-2xl border-4 shadow-xl ${
            selloValido ? 'border-emerald-500' : 'border-red-400'
          }`}
        >
          <div
            className={`px-6 py-8 text-center ${
              selloValido
                ? 'bg-gradient-to-br from-emerald-500 to-blue-600'
                : 'bg-gradient-to-br from-red-500 to-orange-500'
            }`}
          >
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/20">
              <ShieldCheck className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Sello Sanitario PotaSegura</h1>
            <p className="mt-2 text-white/90">{puesto.nombre}</p>
            <p
              className={`mt-4 inline-block rounded-full px-4 py-1 text-sm font-bold ${
                selloValido ? 'bg-white text-emerald-700' : 'bg-white text-red-700'
              }`}
            >
              {selloValido ? 'APTO PARA CONSUMO' : 'NO APTO'}
            </p>
          </div>

          <div className="space-y-4 bg-white p-6">
            <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-4">
              <BadgeCheck className="h-5 w-5 text-emerald-600" />
              <div>
                <p className="text-sm font-medium text-slate-900">Licencia sanitaria</p>
                <p className="text-sm text-slate-500">
                  {licencia ? `${licencia.numero} — Activa` : 'Sin licencia activa'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-4">
              <ClipboardCheck className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-slate-900">Última inspección</p>
                <p className="text-sm capitalize text-slate-500">
                  {ultimaInspeccion
                    ? `${ultimaInspeccion.resultado} — ${ultimaInspeccion.fecha}`
                    : 'Sin inspecciones registradas'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-4">
              <Thermometer className="h-5 w-5 text-sky-600" />
              <div>
                <p className="text-sm font-medium text-slate-900">Cadena de frío</p>
                <p className="text-sm text-slate-500">
                  {ultimaTemp
                    ? `${ultimaTemp.valor}°C — ${tempSegura ? 'Dentro de rango' : 'Fuera de rango'}`
                    : 'Sin registros de temperatura'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
