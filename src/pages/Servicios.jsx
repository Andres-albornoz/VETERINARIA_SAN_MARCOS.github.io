import { Link } from 'react-router';
import placeholder from '../assets/placeholder.png';

const servicios = [
  'consulta',
  'vacunacion',
  'cirugia',
  'desparasitacion',
  'examenes',
  'otros',
];

function Servicios() {
  return (
    <>
      <div className="encabezado">servicios disponibles</div>

      <div className="servicios-grid">
        {servicios.map((id) => (
          <Link key={id} to={`/servicios/${id}`} className="servicio-card">
            <div className="imagenes_cuadradas">
              <img src={placeholder} alt="placeholder" />
            </div>
            <span>{id}</span>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Servicios;
