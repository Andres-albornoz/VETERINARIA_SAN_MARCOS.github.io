function Agendar() {
  return (
    <main>
      <div className="encabezado">agendar consulta</div>

      <form className="site-form" onSubmit={(e) => e.preventDefault()}>
        <h3>ingrese sus datos para agendar su consulta</h3>
        <label htmlFor="nombre-dueno">nombre completo:</label>
        <input type="text" id="nombre-dueno" name="nombre_dueno" placeholder="Escribe tu nombre" />
        <label htmlFor="nombre-mascota">nombre mascota:</label>
        <input
          type="text"
          id="nombre-mascota"
          name="nombre_mascota"
          placeholder="Nombre de tu mascota"
        />
        <label htmlFor="dolencia">dolencia/problema:</label>
        <textarea id="dolencia" name="dolencia" rows="3" placeholder="Describe el problema" />
        <label htmlFor="horas">horas disponibles:</label>
        <input type="time" id="horas" name="horas" />
        <button type="submit">agendar</button>
      </form>
    </main>
  );
}

export default Agendar;
