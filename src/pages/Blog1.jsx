import placeholder from '../assets/placeholder.png';
function Blog1() {
  return (
    <>
      <div className="encabezado">
        5 Señales silenciosas de que tu mascota necesita ir al veterinario (y que podrías estar
        pasando por alto)
      </div>

      <div className="box-text">
        (texto de ejemplo)
        <br />
        A diferencia de los humanos, los perros y gatos son verdaderos expertos en ocultar el
        malestar.
        <br />
        Un instinto ancestral de supervivencia, prefieren no mostrar debilidad ante su entorno.
        <br />
        Esto significa que cuando un síntoma físico se vuelve evidente, es muy probable que la
        molestia o enfermedad lleve días o semanas desarrollándose en silencio.
      </div>

      <img className="nosotros-img" src={placeholder} alt="placeholder" />
    </>
  );
}

export default Blog1;
