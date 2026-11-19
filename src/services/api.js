import { tokenActual } from './storage.js'

// En local se usa el proxy de Vite (/api -> http://localhost:8080).
// En GitHub Pages se define VITE_API_URL con la URL del backend desplegado.
const BASE_URL = (import.meta.env.VITE_API_URL || '/api').replace(/\/+$/, '')

export class ApiError extends Error {
  constructor(mensaje, status) {
    super(mensaje)
    this.name = 'ApiError'
    this.status = status
  }
}

function mensajeDeError(texto, status) {
  if (!texto) return `Error ${status}`
  try {
    const datos = JSON.parse(texto)
    return datos.error || datos.message || `Error ${status}`
  } catch {
    return texto // /api/auth/register devuelve el error como texto plano
  }
}

export async function api(ruta, { method = 'GET', body, conAuth = true } = {}) {
  const token = conAuth ? tokenActual() : null

  let respuesta
  try {
    respuesta = await fetch(`${BASE_URL}${ruta}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    })
  } catch {
    throw new ApiError('No se pudo conectar con el servidor. Intente más tarde.', 0)
  }

  if (!respuesta.ok) {
    throw new ApiError(mensajeDeError(await respuesta.text(), respuesta.status), respuesta.status)
  }

  if (respuesta.status === 204) return null

  const texto = await respuesta.text()
  if (!texto) return null

  try {
    return JSON.parse(texto)
  } catch {
    return texto
  }
}
