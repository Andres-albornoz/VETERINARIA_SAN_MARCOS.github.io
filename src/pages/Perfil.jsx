import { useAuth } from '../core/authContext.js'

export default function Perfil() {
  const { usuario } = useAuth()

  return (
    <main className="perfil">
      <h2>Perfil de Usuario</h2>

      <section className="perfil-card">
        <h3>Datos de la cuenta</h3>
        <ul>
          <li>
            <strong>Correo electrónico:</strong> {usuario?.email}
          </li>
          <li>
            <strong>Rol:</strong> {usuario?.roles}
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
        <p>Las mascotas son datos de ejemplo: el backend aún no expone una API para ellas.</p>
      </section>
    </main>
  )
}
