import { Link, useParams } from 'react-router';
import placeholder from '../assets/placeholder.png';

const nombres = {
  consulta: 'consulta',
  vacunacion: 'vacunación',
  cirugia: 'cirugía',
  desparasitacion: 'desparasitación',
  examenes: 'exámenes',
  otros: 'otros',
};

function ServicioDetalle() {
  const { servicioId } = useParams();
  const nombre = nombres[servicioId] ?? servicioId;

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
  );
}

export default ServicioDetalle;
