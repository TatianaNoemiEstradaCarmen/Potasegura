const KEYS = {
  token: 'potasegura_token',
  user: 'potasegura_user',
  puestos: 'potasegura_puestos',
  productos: 'potasegura_productos',
  lotes: 'potasegura_lotes',
  temperaturas: 'potasegura_temperaturas',
  inspecciones: 'potasegura_inspecciones',
  licencias: 'potasegura_licencias',
}

function read(key) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function getToken() {
  return localStorage.getItem(KEYS.token)
}

export function setToken(token) {
  localStorage.setItem(KEYS.token, token)
}

export function clearSession() {
  localStorage.removeItem(KEYS.token)
  localStorage.removeItem(KEYS.user)
}

export function getUser() {
  return read(KEYS.user) || {}
}

export function setUser(user) {
  write(KEYS.user, user)
}

export function generateId(prefix) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
}

function crud(key) {
  return {
    list: () => read(key) || [],
    save: (items) => write(key, items),
    add: (item) => {
      const items = read(key) || []
      items.push(item)
      write(key, items)
      return item
    },
    update: (id, updates) => {
      const items = (read(key) || []).map((item) =>
        item.id === id ? { ...item, ...updates } : item,
      )
      write(key, items)
      return items.find((item) => item.id === id)
    },
    remove: (id) => {
      const items = (read(key) || []).filter((item) => item.id !== id)
      write(key, items)
    },
    find: (id) => (read(key) || []).find((item) => item.id === id),
  }
}

export const puestosStore = crud(KEYS.puestos)
export const productosStore = crud(KEYS.productos)
export const lotesStore = crud(KEYS.lotes)
export const temperaturasStore = crud(KEYS.temperaturas)
export const inspeccionesStore = crud(KEYS.inspecciones)
export const licenciasStore = crud(KEYS.licencias)

export function getDashboardStats() {
  const licencias = licenciasStore.list()
  return {
    puestos: puestosStore.list().length,
    lotes: lotesStore.list().length,
    inspecciones: inspeccionesStore.list().length,
    licenciasActivas: licencias.filter((l) => l.estado === 'activa').length,
  }
}

export function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export function seedDemoData() {
  if (puestosStore.list().length > 0) return

  const puesto1 = {
    id: generateId('puesto'),
    nombre: 'Puesto Mar Azul',
    latitud: -12.0464,
    longitud: -77.0428,
    numeroLicencia: 'LIC-POTA-2026-001',
    createdAt: new Date().toISOString(),
  }
  const puesto2 = {
    id: generateId('puesto'),
    nombre: 'Puesto Costa Verde',
    latitud: -12.05,
    longitud: -77.035,
    numeroLicencia: 'LIC-POTA-2026-002',
    createdAt: new Date().toISOString(),
  }

  puestosStore.add(puesto1)
  puestosStore.add(puesto2)

  const producto = productosStore.add({
    id: generateId('producto'),
    nombre: 'Pota fresca',
    descripcion: 'Dosidicus gigas eviscerada',
    precioKg: 18.5,
    createdAt: new Date().toISOString(),
  })

  const lote = lotesStore.add({
    id: generateId('lote'),
    codigo: 'LOTE-2026-001',
    productoId: producto.id,
    cantidadKg: 120,
    fechaCaptura: '2026-06-20',
    estado: 'fresco',
    createdAt: new Date().toISOString(),
  })

  temperaturasStore.add({
    id: generateId('temp'),
    loteId: lote.id,
    valor: 2.5,
    fechaHora: new Date().toISOString(),
    observacion: 'Cadena de frío correcta',
  })

  inspeccionesStore.add({
    id: generateId('insp'),
    loteId: lote.id,
    inspector: 'Dra. Carmen Ruiz',
    resultado: 'aprobado',
    observaciones: 'Producto apto para consumo',
    fecha: new Date().toISOString().slice(0, 10),
  })

  licenciasStore.add({
    id: generateId('lic'),
    puestoId: puesto1.id,
    numero: puesto1.numeroLicencia,
    estado: 'activa',
    fechaEmision: '2026-01-15',
    fechaRevocacion: null,
  })
}
