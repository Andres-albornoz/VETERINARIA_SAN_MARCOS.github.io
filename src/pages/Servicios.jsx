import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { api } from '../services/api.js'
import placeholder from '../assets/placeholder.png'

const precio = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
})

export default function Servicios() {
  const [servicios, setServicios] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [intento, setIntento] = useState(0)

  function reintentar() {
    setError('')
    setCargando(true)
    setIntento((numero) => numero + 1)
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
        <button type="button" onClick={reintentar}>
          reintentar
        </button>
      </main>
    )
  }

  return (
    <>
      <div className="encabezado">servicios disponibles</div>

      <div className="servicios-grid">
        {servicios.length === 0 && <p>no hay servicios registrados</p>}
        {servicios.map((servicio) => (
          <Link key={servicio.codigo} to={`/servicios/${servicio.codigo}`} className="servicio-card">
            <div className="imagenes_cuadradas">
              <img src={placeholder} alt={servicio.nombre} />
            </div>
            <span>{servicio.nombre}</span>
            <small>{servicio.categoria}</small>
            <small>{precio.format(servicio.precio)}</small>
          </Link>
        ))}
      </div>
    </>
  )
}
