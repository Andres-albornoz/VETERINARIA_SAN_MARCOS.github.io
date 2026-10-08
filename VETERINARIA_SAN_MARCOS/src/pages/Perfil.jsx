function Perfil() {
  return (
    <main className="perfil">
      <h2>Perfil de Usuario</h2>

      <section className="perfil-card">
        <h3>Datos Personales</h3>
        <ul>
          <li>
            <strong>Nombre completo:</strong> cliente de ejemplo
          </li>
          <li>
            <strong>Correo electrónico:</strong> cliente@example.com
          </li>
          <li>
            <strong>Teléfono:</strong> +56 9 1234 5678
          </li>
          <li>
            <strong>Dirección:</strong> Av. Ejemplo 123, Ejemplo
          </li>
        </ul>
      </section>

      <section className="perfil-card">
        <h3>Mascotas Registradas</h3>
        <ul>
          <li>
            <strong>Mascota 1:</strong> Firulais (Perro - Golden Retriever)
          </li>
          <li>
            <strong>Mascota 2:</strong> Michi (Gato - Mestizo)
          </li>
        </ul>
      </section>
    </main>
  );
}

export default Perfil;
