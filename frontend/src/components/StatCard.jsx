export default function StatCard({ title, value, icon: Icon, color = 'green' }) {
  const colors = {
    green: 'from-emerald-500 to-emerald-600',
    blue: 'from-blue-500 to-blue-600',
    teal: 'from-teal-500 to-emerald-600',
    sky: 'from-sky-500 to-blue-600',
  }

  return (
    <div className="rounded-xl border border-emerald-100 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-bold text-slate-800">{value}</p>
        </div>
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br ${colors[color]} text-white shadow-sm`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  )
}
