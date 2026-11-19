import { useCallback, useMemo, useState } from 'react'
import { api } from '../services/api.js'
import { borrarAuth, guardarAuth, leerAuth } from '../services/storage.js'
import { AuthContext } from './authContext.js'

function tokenVigente(token) {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    const payload = JSON.parse(atob(base64))
    return !payload.exp || payload.exp * 1000 > Date.now()
  } catch {
    return false
  }
}

function sesionInicial() {
  const guardada = leerAuth()
  if (!guardada?.token || !tokenVigente(guardada.token)) {
    borrarAuth()
    return null
  }
  return guardada
}

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(sesionInicial)

  const login = useCallback(async (email, password) => {
    const datos = await api('/auth/login', {
      method: 'POST',
      body: { email, password },
      conAuth: false,
    })
    const sesion = { token: datos.token, email: datos.email, roles: datos.roles }
    guardarAuth(sesion)
    setUsuario(sesion)
    return sesion
  }, [])

  const registrar = useCallback(async ({ nombre, email, password }) => {
    await api('/auth/register', {
      method: 'POST',
      body: { nombre, email, password },
      conAuth: false,
    })
  }, [])

  const logout = useCallback(() => {
    borrarAuth()
    setUsuario(null)
  }, [])

  const valor = useMemo(
    () => ({
      usuario,
      autenticado: Boolean(usuario),
      esAdmin: usuario?.roles === 'ADMIN',
      login,
      registrar,
      logout,
    }),
    [usuario, login, registrar, logout],
  )

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>
}
