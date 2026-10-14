import { describe, it, expect, vi, afterEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useFetch } from '../../hooks/useFetch.js'

describe('useFetch (prueba unitaria)', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('parte en null y luego devuelve los datos de la petición', async () => {
    const datos = [{ id: 1, nombre: 'Consulta' }]

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        json: () => Promise.resolve(datos),
      }),
    )

    const { result } = renderHook(() => useFetch('/api/servicios'))

    expect(result.current).toBeNull()

    await waitFor(() => {
      expect(result.current).toEqual(datos)
    })

    expect(fetch).toHaveBeenCalledWith('/api/servicios')
  })

  it('devuelve null si la petición falla', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('fallo de red')))

    const { result } = renderHook(() => useFetch('/api/error'))

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/error')
    })

    expect(result.current).toBeNull()
  })
})
