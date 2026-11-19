const CLAVE = 'veterinaria_san_marcos_auth'

export function leerAuth() {
  try {
    const guardado = localStorage.getItem(CLAVE)
    return guardado ? JSON.parse(guardado) : null
  } catch {
    return null
  }
}

export function guardarAuth(sesion) {
  localStorage.setItem(CLAVE, JSON.stringify(sesion))
}

export function borrarAuth() {
  localStorage.removeItem(CLAVE)
}

export function tokenActual() {
  return leerAuth()?.token ?? null
}
