import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { api } from '../services/api.js'
import { useAuth } from '../core/authContext.js'
import placeholder from '../assets/placeholder.png'

const precio = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
})

const formularioVacio = {
  categoria: '',
  nombre: '',
  especie: '',
  duracion: '',
  precio: '',
  observaciones: '',
}

export default function Servicios() {
  const { esAdmin } = useAuth()
  const [servicios, setServicios] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [intento, setIntento] = useState(0)

  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [editando, setEditando] = useState(null)
  const [formulario, setFormulario] = useState(formularioVacio)
  const [guardando, setGuardando] = useState(false)
  const [accionError, setAccionError] = useState('')

  function recargar() {
    setError('')
    setCargando(true)
    setIntento((numero) => numero + 1)
  }

  function abrirNuevo() {
    setEditando(null)
    setFormulario(formularioVacio)
    setAccionError('')
    setMostrarFormulario(true)
  }

  function abrirEditar(servicio) {
    setEditando(servicio.codigo)
    setFormulario({
      categoria: servicio.categoria ?? '',
      nombre: servicio.nombre ?? '',
      especie: servicio.especie ?? '',
      duracion: String(servicio.duracion ?? ''),
      precio: String(servicio.precio ?? ''),
      observaciones: servicio.observaciones ?? '',
    })
    setAccionError('')
    setMostrarFormulario(true)
  }

  function cerrarFormulario() {
    setMostrarFormulario(false)
    setEditando(null)
    setFormulario(formularioVacio)
    setAccionError('')
  }

  function actualizarCampo(evento) {
    const { name, value } = evento.target
    setFormulario((anterior) => ({ ...anterior, [name]: value }))
  }

  async function guardar(evento) {
    evento.preventDefault()
    if (!esAdmin) return

    setAccionError('')
    setGuardando(true)

    const cuerpo = {
      categoria: formulario.categoria.trim(),
      nombre: formulario.nombre.trim(),
      especie: formulario.especie.trim(),
      duracion: Number(formulario.duracion),
      precio: Number(formulario.precio),
      observaciones: formulario.observaciones.trim(),
    }

    try {
      if (editando == null) {
        await api('/servicios', { method: 'POST', body: cuerpo })
      } else {
        await api(`/servicios/${editando}`, { method: 'PUT', body: cuerpo })
      }
      cerrarFormulario()
      recargar()
    } catch (err) {
      setAccionError(err.message)
    } finally {
      setGuardando(false)
    }
  }

  async function eliminar(servicio) {
    if (!esAdmin) return
    if (!window.confirm(`¿Eliminar el servicio "${servicio.nombre}"?`)) return

    setAccionError('')
    try {
      await api(`/servicios/${servicio.codigo}`, { method: 'DELETE' })
      recargar()
    } catch (err) {
      setAccionError(err.message)
    }
  }

  useEffect(() => {
    let activo = true

    api('/servicios')
      .then((datos) => {
        if (activo) setServicios(Array.isArray(datos) ? datos : [])
      })
      .catch((err) => {
        if (activo) setError(err.message)
      })
      .finally(() => {
        if (activo) setCargando(false)
      })

    return () => {
      activo = false
    }
  }, [intento])

  if (cargando) return <p>cargando servicios...</p>

  if (error) {
    return (
      <main>
        <p role="alert">No se pudieron cargar los servicios: {error}</p>
        <button type="button" onClick={recargar}>
          reintentar
        </button>
      </main>
    )
  }

  return (
    <>
      <div className="encabezado">servicios disponibles</div>

      {esAdmin && (
        <div className="acciones-admin">
          <button type="button" onClick={abrirNuevo}>
            nuevo servicio
          </button>
        </div>
      )}

      {esAdmin && accionError && (
        <p className="mensaje-accion" role="alert">
          {accionError}
        </p>
      )}

      {esAdmin && mostrarFormulario && (
        <form className="site-form" onSubmit={guardar}>
          <h2>{editando == null ? 'Nuevo servicio' : 'Editar servicio'}</h2>

          <label htmlFor="servicio-categoria">categoria:</label>
          <input
            id="servicio-categoria"
            name="categoria"
            required
            maxLength="20"
            value={formulario.categoria}
            onChange={actualizarCampo}
          />

          <label htmlFor="servicio-nombre">nombre:</label>
          <input
            id="servicio-nombre"
            name="nombre"
            required
            maxLength="40"
            value={formulario.nombre}
            onChange={actualizarCampo}
          />

          <label htmlFor="servicio-especie">especie:</label>
          <input
            id="servicio-especie"
            name="especie"
            required
            maxLength="20"
            value={formulario.especie}
            onChange={actualizarCampo}
          />

          <label htmlFor="servicio-duracion">duración (min):</label>
          <input
            id="servicio-duracion"
            name="duracion"
            type="number"
            min="0"
            required
            value={formulario.duracion}
            onChange={actualizarCampo}
          />

          <label htmlFor="servicio-precio">precio:</label>
          <input
            id="servicio-precio"
            name="precio"
            type="number"
            min="0"
            required
            value={formulario.precio}
            onChange={actualizarCampo}
          />

          <label htmlFor="servicio-observaciones">observaciones:</label>
          <textarea
            id="servicio-observaciones"
            name="observaciones"
            rows="3"
            maxLength="100"
            required
            value={formulario.observaciones}
            onChange={actualizarCampo}
          />

          <div className="admin-controles">
            <button type="submit" disabled={guardando}>
              {guardando ? 'guardando...' : editando == null ? 'crear' : 'guardar cambios'}
            </button>
            <button type="button" className="btn-cancelar" onClick={cerrarFormulario}>
              cancelar
            </button>
          </div>
        </form>
      )}

      <div className="servicios-grid">
        {servicios.length === 0 && <p>no hay servicios registrados</p>}
        {servicios.map((servicio) => (
          <div className="servicio-item" key={servicio.codigo}>
            <Link to={`/servicios/${servicio.codigo}`} className="servicio-card">
              <div className="imagenes_cuadradas">
                <img src={placeholder} alt={servicio.nombre} />
              </div>
              <span>{servicio.nombre}</span>
              <small>{servicio.categoria}</small>
              <small>{precio.format(servicio.precio)}</small>
            </Link>

            {esAdmin && (
              <div className="admin-controles">
                <button type="button" onClick={() => abrirEditar(servicio)}>
                  editar
                </button>
                <button
                  type="button"
                  className="btn-eliminar"
                  onClick={() => eliminar(servicio)}
                >
                  eliminar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
