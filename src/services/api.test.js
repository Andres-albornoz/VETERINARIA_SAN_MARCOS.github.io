import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { api } from './api.js'
import { borrarAuth, guardarAuth } from './storage.js'

describe('cliente API', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
    borrarAuth()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    borrarAuth()
  })

  it('envía el token Bearer y devuelve el JSON', async () => {
    guardarAuth({ token: 'abc', email: 'user@user.cl', roles: 'USER' })
    fetch.mockResolvedValue({
      ok: true,
      status: 200,
      text: async () => JSON.stringify([{ codigo: 1 }]),
    })

    const datos = await api('/servicios')

    expect(datos).toEqual([{ codigo: 1 }])
    const [url, opciones] = fetch.mock.calls[0]
    expect(url).toBe('/api/servicios')
    expect(opciones.headers.Authorization).toBe('Bearer abc')
  })

  it('convierte el error JSON en ApiError', async () => {
    fetch.mockResolvedValue({
      ok: false,
      status: 404,
      text: async () => JSON.stringify({ error: 'No encontrado' }),
    })

    await expect(api('/servicios/99')).rejects.toMatchObject({
      message: 'No encontrado',
      status: 404,
    })
  })

  it('no envía token en el login', async () => {
    fetch.mockResolvedValue({
      ok: true,
      status: 200,
      text: async () => JSON.stringify({ token: 't' }),
    })

    await api('/auth/login', {
      method: 'POST',
      body: { email: 'user@user.cl', password: 'user123' },
      conAuth: false,
    })

    expect(fetch.mock.calls[0][1].headers.Authorization).toBeUndefined()
  })
})
