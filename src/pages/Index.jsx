import { Link } from 'react-router';
import fondo from '../assets/fondo.jpg';/*
import carrito from '../assets/carrito.png';
import carrito from '../assets/carrito.png';
import carrito from '../assets/carrito.png';
import carrito from '../assets/carrito.png';
import carrito from '../assets/carrito.png';

/*
const servicios = [
  { nombre: 'Consultas', imagen: '/imagen/consulta.jpg', id: 'consulta' },
  { nombre: 'Vacunación', imagen: '/imagen/vacuna.jpg', id: 'vacunacion' },
  { nombre: 'Cirugía', imagen: '/imagen/cirugia.jpg', id: 'cirugia' },
  { nombre: 'Desparasitación', imagen: '/imagen/desparasitacion.jpg', id: 'desparasitacion' },
  { nombre: 'Exámenes', imagen: '/imagen/examenes.jpg', id: 'examenes' },
  { nombre: 'Otros', imagen: '/imagen/Otros.jpg', id: 'otros' },
];
*/
function Index() {
  return (
    <>
      <section className="banner-container">
        <Link to="/nosotros">
          <img src={fondo} alt="fondo" />
        </Link>
      </section>

      <div className="boton">
        <Link to="/agendar">agenda su cita</Link>
      </div>

      <div className="encabezado">servicios</div>

      
    </>
  );
}

export default Index;
