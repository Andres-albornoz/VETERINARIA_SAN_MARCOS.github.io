import { beforeEach, describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router'
import ServicioDetalle from './ServicioDetalle.jsx'
import { api } from '../services/api.js'

vi.mock('../services/api.js', () => ({ api: vi.fn() }))

function renderServicio(id) {
  return render(
    <MemoryRouter initialEntries={[`/servicios/${id}`]}>
      <Routes>
        <Route path="/servicios/:servicioId" element={<ServicioDetalle />} />
      </Routes>
    </MemoryRouter>,
  )
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('ServicioDetalle', () => {
  it('traduce un id slug a un nombre legible', () => {
    renderServicio('vacunacion')
    expect(screen.getByText('vacunación')).toBeInTheDocument()
    expect(api).not.toHaveBeenCalled()
  })

  it('si el slug no está en el mapa, muestra el id tal cual', () => {
    renderServicio('noexiste')
    expect(screen.getAllByText(/noexiste/i).length).toBeGreaterThan(0)
  })

  it('carga el servicio real cuando el id es numérico', async () => {
    vi.mocked(api).mockResolvedValue({
      codigo: 5,
      categoria: 'Cirugía',
      nombre: 'Cirugía de tejidos',
      especie: 'Perro',
      duracion: 60,
      precio: 80000,
      observaciones: 'Control posterior',
    })

    renderServicio('5')

    expect(await screen.findByText('Cirugía de tejidos')).toBeInTheDocument()
    expect(api).toHaveBeenCalledWith('/servicios/5')
    expect(screen.getByText(/Control posterior/)).toBeInTheDocument()
  })
})
