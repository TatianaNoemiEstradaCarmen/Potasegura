import { useEffect, useState } from 'react'
import { Store, Layers, ClipboardCheck, BadgeCheck } from 'lucide-react'
import DashboardLayout from '../../layouts/DashboardLayout'
import StatCard from '../../components/StatCard'
import PageHeader from '../../components/PageHeader'
import { getDashboardStats, getUser, seedDemoData } from '../../services/storage'

export default function Dashboard() {
  const [stats, setStats] = useState(getDashboardStats())
  const user = getUser()

  useEffect(() => {
    seedDemoData()
    setStats(getDashboardStats())
  }, [])

  const cards = [
    { title: 'Puestos registrados', value: stats.puestos, icon: Store, color: 'green' },
    { title: 'Lotes registrados', value: stats.lotes, icon: Layers, color: 'blue' },
    { title: 'Inspecciones', value: stats.inspecciones, icon: ClipboardCheck, color: 'teal' },
    { title: 'Licencias activas', value: stats.licenciasActivas, icon: BadgeCheck, color: 'sky' },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <PageHeader
          title="Dashboard"
          description={`Bienvenido${user.nombre ? `, ${user.nombre}` : ''}. Resumen de tu actividad en PotaSegura.`}
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <StatCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
