import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { api } from '../services/api.js'
import placeholder from '../assets/placeholder.png'

const nombres = {
  consulta: 'consulta',
  vacunacion: 'vacunación',
  cirugia: 'cirugía',
  desparasitacion: 'desparasitación',
  examenes: 'exámenes',
  otros: 'otros',
}

const precio = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
})

function DetalleLegacy({ nombre }) {
  return (
    <>
      <div className="encabezado">{nombre}</div>

      <table className="servicio-detalle">
        <tbody>
          <tr>
            <td>
              <img src={placeholder} alt="placeholder" />
            </td>
            <td>
              <strong>servicio de {nombre}</strong>
              <br />
              texto de ejemplo del servicio, breve descripción y costo
            </td>
          </tr>
        </tbody>
      </table>

      <div className="boton">
        <Link to="/agendar">agenda su cita</Link>
      </div>
    </>
  )
}

export default function ServicioDetalle() {
  const { servicioId } = useParams()
  const esIdBackend = /^\d+$/.test(servicioId)
  const [servicio, setServicio] = useState(null)
  const [cargando, setCargando] = useState(esIdBackend)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!esIdBackend) return undefined

    let activo = true

    api(`/servicios/${servicioId}`)
      .then((datos) => {
        if (activo) {
          setServicio(datos)
          setError('')
        }
      })
      .catch((err) => {
        if (activo) {
          setServicio(null)
          setError(err.message)
        }
      })
      .finally(() => {
        if (activo) setCargando(false)
      })

    return () => {
      activo = false
    }
  }, [servicioId, esIdBackend])

  if (!esIdBackend) return <DetalleLegacy nombre={nombres[servicioId] ?? servicioId} />

  if (cargando) return <p>cargando servicio...</p>

  if (error) {
    return (
      <main>
        <p role="alert">No se pudo cargar el servicio: {error}</p>
        <Link to="/servicios">volver a servicios</Link>
      </main>
    )
  }

  return (
    <>
      <div className="encabezado">{servicio?.nombre}</div>

      <table className="servicio-detalle">
        <tbody>
          <tr>
            <td>
              <img src={placeholder} alt={servicio?.nombre} />
            </td>
            <td>
              <strong>{servicio?.categoria}</strong>
              <br />
              {servicio?.observaciones || 'sin observaciones'}
              <br />
              {servicio?.especie && <>especie: {servicio.especie}<br /></>}
              {servicio?.duracion != null && <>duración: {servicio.duracion} min<br /></>}
              {servicio?.precio != null && <>precio: {precio.format(servicio.precio)}</>}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="boton">
        <Link to="/agendar">agenda su cita</Link>
      </div>
    </>
  )
}
