import AuthNavbar from '../components/AuthNavbar'

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <AuthNavbar />
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10">
        {children}
      </main>
    </div>
  )
}
