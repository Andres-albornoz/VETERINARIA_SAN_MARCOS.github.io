function Contacto() {
  return (
    <main>
      <h2>VETERINARIA SAN MARCOS</h2>

      <form className="site-form" onSubmit={(e) => e.preventDefault()}>
        <h3>formulario contacto:</h3>
        <label htmlFor="nombre">nombre completo:</label>
        <input type="text" id="nombre" name="nombre" placeholder="Escribe tu nombre completo" />
        <label htmlFor="correo">correo:</label>
        <input type="email" id="correo" name="correo" placeholder="ejemplo@correo.com" />
        <label htmlFor="contenido">contenido:</label>
        <textarea id="contenido" name="contenido" rows="5" placeholder="Escribe tu mensaje aquí..." />
        <button type="submit">enviar</button>
      </form>
    </main>
  );
}

export default Contacto;
