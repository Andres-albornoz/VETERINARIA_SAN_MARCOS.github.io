import { Link } from 'react-router-dom';

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
              <img src="/imagen/placeholder.png" alt="placeholder" />
            </div>
            <span>{id}</span>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Servicios;
