import { beforeEach, describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import Servicios from './Servicios.jsx'
import { api } from '../services/api.js'
import { useAuth } from '../core/authContext.js'

vi.mock('../services/api.js', () => ({ api: vi.fn() }))
vi.mock('../core/authContext.js', () => ({ useAuth: vi.fn() }))

const servicios = [
  {
    codigo: 1,
    categoria: 'Consulta',
    nombre: 'Consulta general',
    especie: 'Perro',
    duracion: 30,
    precio: 15000,
    observaciones: 'Checkup',
  },
  {
    codigo: 2,
    categoria: 'Vacuna',
    nombre: 'Vacunación',
    especie: 'Perro',
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

function responderSiempre(datos) {
  vi.mocked(api).mockImplementation(() => Promise.resolve(datos))
}

beforeEach(() => {
  vi.clearAllMocks()
  vi.mocked(useAuth).mockReturnValue({ esAdmin: false })
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

  it('no muestra controles de edicion para un usuario normal', async () => {
    responderSiempre(servicios)

    renderServicios()

    expect(await screen.findByText('Consulta general')).toBeInTheDocument()
    expect(screen.queryByText('nuevo servicio')).not.toBeInTheDocument()
    expect(screen.queryByText('editar')).not.toBeInTheDocument()
    expect(screen.queryByText('eliminar')).not.toBeInTheDocument()
  })

  it('permite a un admin crear un servicio con POST', async () => {
    vi.mocked(useAuth).mockReturnValue({ esAdmin: true })
    responderSiempre(servicios)
    const usuario = userEvent.setup()

    renderServicios()

    await usuario.click(await screen.findByText('nuevo servicio'))
    await usuario.type(screen.getByLabelText('categoria:'), 'Consulta')
    await usuario.type(screen.getByLabelText('nombre:'), 'Control dental')
    await usuario.type(screen.getByLabelText('especie:'), 'Perro')
    await usuario.type(screen.getByLabelText('duración (min):'), '30')
    await usuario.type(screen.getByLabelText('precio:'), '18000')
    await usuario.type(screen.getByLabelText('observaciones:'), 'Limpieza')
    await usuario.click(screen.getByText('crear', { selector: 'button' }))

    await waitFor(() =>
      expect(api).toHaveBeenCalledWith('/servicios', {
        method: 'POST',
        body: {
          categoria: 'Consulta',
          nombre: 'Control dental',
          especie: 'Perro',
          duracion: 30,
          precio: 18000,
          observaciones: 'Limpieza',
        },
      }),
    )
  })

  it('permite a un admin editar un servicio con PUT', async () => {
    vi.mocked(useAuth).mockReturnValue({ esAdmin: true })
    responderSiempre(servicios)
    const usuario = userEvent.setup()

    renderServicios()

    await usuario.click((await screen.findAllByText('editar'))[0])
    expect(screen.getByLabelText('nombre:')).toHaveValue('Consulta general')

    await usuario.clear(screen.getByLabelText('nombre:'))
    await usuario.type(screen.getByLabelText('nombre:'), 'Consulta actualizada')
    await usuario.click(screen.getByText('guardar cambios', { selector: 'button' }))

    await waitFor(() =>
      expect(api).toHaveBeenCalledWith('/servicios/1', {
        method: 'PUT',
        body: {
          categoria: 'Consulta',
          nombre: 'Consulta actualizada',
          especie: 'Perro',
          duracion: 30,
          precio: 15000,
          observaciones: 'Checkup',
        },
      }),
    )
  })

  it('permite a un admin eliminar un servicio con DELETE', async () => {
    vi.mocked(useAuth).mockReturnValue({ esAdmin: true })
    responderSiempre(servicios)
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    const usuario = userEvent.setup()

    renderServicios()

    await usuario.click((await screen.findAllByText('eliminar'))[0])

    await waitFor(() =>
      expect(api).toHaveBeenCalledWith('/servicios/1', { method: 'DELETE' }),
    )
  })
})
