function Registro() {
  return (
    <main>
      <form className="site-form" onSubmit={(e) => e.preventDefault()}>
        <h3>registro de usuario</h3>
        <label htmlFor="nombre">nombre completo:</label>
        <input type="text" id="nombre" name="nombre" placeholder="Escribe tu nombre" />
        <label htmlFor="correo">correo:</label>
        <input type="email" id="correo" name="correo" placeholder="ejemplo@correo.com" />
        <label htmlFor="password">contraseña:</label>
        <input type="password" id="password" name="password" />
        <label htmlFor="confirm-password">confirmar contraseña:</label>
        <input type="password" id="confirm-password" name="confirm-password" />
        <label htmlFor="telefono">teléfono:</label>
        <input type="tel" id="telefono" name="telefono" placeholder="+56 9 1234 5678" />
        <button type="submit">registrar</button>
      </form>
    </main>
  );
}

export default Registro;
