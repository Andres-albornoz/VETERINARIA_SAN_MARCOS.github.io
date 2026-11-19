import { beforeEach, describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Servicios from './Servicios.jsx'
import { api } from '../services/api.js'

vi.mock('../services/api.js', () => ({ api: vi.fn() }))

const servicios = [
  {
    codigo: 1,
    categoria: 'Consulta',
    nombre: 'Consulta general',
    duracion: 30,
    precio: 15000,
    observaciones: 'Checkup',
  },
  {
    codigo: 2,
    categoria: 'Vacuna',
    nombre: 'Vacunación',
    duracion: 20,
    precio: 25000,
    observaciones: '',
  },
]

function renderServicios() {
  return render(
    <MemoryRouter>
      <Servicios />
    </MemoryRouter>,
  )
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('Servicios', () => {
  it('carga los servicios desde la API y enlaza al detalle por codigo', async () => {
    vi.mocked(api).mockResolvedValue(servicios)

    renderServicios()

    expect(await screen.findByText('Consulta general')).toBeInTheDocument()
    expect(api).toHaveBeenCalledWith('/servicios')

    const enlaces = screen.getAllByRole('link')
    expect(enlaces).toHaveLength(2)
    expect(enlaces[0]).toHaveAttribute('href', '/servicios/1')
  })

  it('muestra el error devuelto por la API', async () => {
    vi.mocked(api).mockRejectedValue(new Error('No autorizado'))

    renderServicios()

    expect(await screen.findByRole('alert')).toHaveTextContent('No autorizado')
  })
})
