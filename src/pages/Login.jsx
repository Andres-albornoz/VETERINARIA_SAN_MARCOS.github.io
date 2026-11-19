import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { useAuth } from '../core/authContext.js'

export default function Login() {
  const { login } = useAuth()
  const navegar = useNavigate()
  const ubicacion = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)
  const destino = ubicacion.state?.desde || '/servicios'

  async function manejarEnvio(evento) {
    evento.preventDefault()
    setError('')
    setEnviando(true)
    try {
      await login(email.trim(), password)
      navegar(destino, { replace: true })
    } catch (err) {
      setError(err.status === 401 ? 'Correo o contraseña incorrectos.' : err.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <main>
      <div className="encabezado">iniciar sesión</div>

      <form className="site-form" onSubmit={manejarEnvio}>
        <h3>ingrese con su cuenta</h3>
        <label htmlFor="email">correo:</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          value={email}
          onChange={(evento) => setEmail(evento.target.value)}
        />
        <label htmlFor="password">contraseña:</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(evento) => setPassword(evento.target.value)}
        />
        {error && <p role="alert">{error}</p>}
        <button type="submit" disabled={enviando}>
          {enviando ? 'ingresando...' : 'ingresar'}
        </button>
      </form>

      <p>¿No tiene cuenta? <Link to="/registro">regístrese aquí</Link></p>
      {import.meta.env.DEV && (
        <p>Usuarios de prueba: admin@admin.cl / admin123 · user@user.cl / user123</p>
      )}
    </main>
  )
}
