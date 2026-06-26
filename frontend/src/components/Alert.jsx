export default function Alert({ type = 'success', children }) {
  const styles = {
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    error: 'bg-red-50 text-red-700 border-red-200',
    info: 'bg-blue-50 text-blue-700 border-blue-200',
  }

  return (
    <div className={`rounded-lg border px-4 py-3 text-sm ${styles[type]}`}>{children}</div>
  )
}
