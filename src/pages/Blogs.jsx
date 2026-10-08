import { Link } from 'react-router';

function Blogs() {
  return (
    <>
      <div className="encabezado">NOTICIAS IMPORTANTES</div>

      <br />

      <div className="box-text_blogs">
        <h2>¡Bienvenidos a nuestro blog de noticias veterinarias!</h2>
        <p>
          En este espacio, compartiremos información relevante sobre el cuidado de tus mascotas,
          consejos de salud, novedades en el mundo veterinario y mucho más. Nuestro objetivo es
          mantenerte informado y ayudarte a brindar la mejor atención a tus compañeros peludos.
        </p>
      </div>

      <br />

      <Link to="/blogs/blog-1" className="box-text_blogs blog-card">
        <h2>5 SEÑALES SILENCIOSAS DE DOLOR</h2>
        <div className="blog-fila">
          <p>
            Perros y gatos son expertos en ocultar cuando se sienten mal.
            <br />
            Los 5 cambios sutiles en su rutina para detectar a tiempo si tu mascota necesita atención
            profesional en Veterinaria San Marcos.
          </p>
          <img src="public/imagen/placeholder.png" alt="placeholder" />
        </div>
      </Link>

      <br />

      <Link to="/blogs/blog-2" className="box-text_blogs blog-card">
        <h2>CASO CLÍNICO: LA HISTORIA DE MARCOS</h2>
        <div className="blog-fila">
          <p>
            Conoce al paciente mestizo que nos enseñó la verdadera vocación médica.
            <br />
            Un rescate de emergencia que dio origen a lo que hoy es nuestra clínica veterinaria y
            nuestro compromiso con tu comunidad.
          </p>
          <img src="public/imagen/placeholder.png" alt="placeholder" />
        </div>
      </Link>
    </>
  );
}

export default Blogs;
