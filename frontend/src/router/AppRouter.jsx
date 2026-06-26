import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import Landing from '../pages/Landing/Landing'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import Dashboard from '../pages/Dashboard/Dashboard'
import NuevoPuesto from '../pages/Puestos/NuevoPuesto'
import Productos from '../pages/Productos/Productos'
import Lotes from '../pages/Lotes/Lotes'
import Temperatura from '../pages/Temperatura/Temperatura'
import Inspecciones from '../pages/Inspecciones/Inspecciones'
import Licencias from '../pages/Licencias/Licencias'
import BuscarPuestos from '../pages/Busqueda/BuscarPuestos'
import SelloSanitario from '../pages/Sello/SelloSanitario'

function Protected({ children }) {
  return <ProtectedRoute>{children}</ProtectedRoute>
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
      <Route path="/puestos/nuevo" element={<Protected><NuevoPuesto /></Protected>} />
      <Route path="/productos" element={<Protected><Productos /></Protected>} />
      <Route path="/lotes" element={<Protected><Lotes /></Protected>} />
      <Route path="/temperatura" element={<Protected><Temperatura /></Protected>} />
      <Route path="/inspecciones" element={<Protected><Inspecciones /></Protected>} />
      <Route path="/licencias" element={<Protected><Licencias /></Protected>} />
      <Route path="/buscar-puestos" element={<Protected><BuscarPuestos /></Protected>} />
      <Route path="/sello/:puestoId" element={<Protected><SelloSanitario /></Protected>} />
    </Routes>
  )
}
