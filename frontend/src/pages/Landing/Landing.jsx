import { Link } from 'react-router-dom'
import {
  ShieldCheck,
  MapPin,
  Thermometer,
  BadgeCheck,
  ArrowRight,
  Fish,
} from 'lucide-react'
import Navbar from '../../components/Navbar'

const features = [
  {
    icon: MapPin,
    title: 'Puestos con ubicación',
    description:
      'Registra tu puesto de venta con coordenadas geográficas para que los clientes encuentren pota fresca cerca de ellos.',
  },
  {
    icon: Thermometer,
    title: 'Control de temperatura',
    description:
      'Monitorea la cadena de frío desde el lote hasta el mostrador, garantizando la inocuidad del producto.',
  },
  {
    icon: BadgeCheck,
    title: 'Licencias y sellos',
    description:
      'Emite, consulta y revoca licencias sanitarias. Los clientes verifican el sello de inocuidad antes de comprar.',
  },
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-blue-50">
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-1.5 text-sm font-medium text-emerald-700 shadow-sm">
              <Fish className="h-4 w-4" />
              Trazabilidad de pota · Inocuidad alimentaria
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Vende pota con{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                confianza sanitaria
              </span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              PotaSegura conecta vendedores y clientes con trazabilidad de lotes,
              inspecciones, temperatura y licencias sanitarias.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/login"
                className="inline-flex w-full items-center justify-center rounded-xl border-2 border-blue-600 px-8 py-3.5 text-base font-semibold text-blue-600 hover:bg-blue-50 sm:w-auto"
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/register"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg hover:bg-emerald-700 sm:w-auto"
              >
                Registrarse
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-emerald-100 bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-600">
              <ShieldCheck className="h-7 w-7 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">¿Qué es PotaSegura?</h2>
            <p className="mt-4 text-lg text-slate-600">
              Plataforma de trazabilidad para la venta de pota. Los vendedores registran
              puestos, lotes e inspecciones; los clientes buscan puestos cercanos y
              verifican el sello sanitario.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-2xl border border-emerald-100 bg-gradient-to-b from-white to-emerald-50/30 p-6 shadow-sm"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-emerald-600 to-blue-600 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Comienza a registrar tu puesto hoy
          </h2>
          <Link
            to="/register"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-emerald-700 shadow-lg hover:bg-emerald-50"
          >
            Crear cuenta de vendedor
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-emerald-100 bg-white py-8 text-center text-sm text-slate-500">
        <p>© {new Date().getFullYear()} PotaSegura — Inocuidad alimentaria</p>
      </footer>
    </div>
  )
}
