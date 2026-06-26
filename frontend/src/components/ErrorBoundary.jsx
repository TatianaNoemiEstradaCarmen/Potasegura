import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-red-50 p-6">
          <div className="max-w-lg rounded-xl border border-red-200 bg-white p-6 shadow-sm">
            <h1 className="text-lg font-bold text-red-700">Error al cargar PotaSegura</h1>
            <p className="mt-2 text-sm text-slate-600">
              {this.state.error.message || 'Ocurrió un error inesperado.'}
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white"
            >
              Recargar
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
