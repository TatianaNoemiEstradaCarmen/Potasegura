import { Link } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'

export default function AuthNavbar() {
  return (
    <header className="border-b border-emerald-100 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-blue-600">
            <ShieldCheck className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-blue-700">PotaSegura</span>
        </Link>
      </div>
    </header>
  )
}
