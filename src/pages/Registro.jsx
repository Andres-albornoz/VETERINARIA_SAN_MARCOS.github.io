import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../core/authContext.js'
import { esEmailValido, sonContrasenasIguales } from '../core/validaciones.js'

export default function Registro() {
  const { registrar, login } = useAuth()
  const navegar = useNavigate()
  const [formulario, setFormulario] = useState({
    nombre: '',
    correo: '',
    password: '',
    'confirm-password': '',
  })
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)

  function actualizar(evento) {
    const { name, value } = evento.target
    setFormulario((anterior) => ({ ...anterior, [name]: value }))
  }

  async function manejarEnvio(evento) {
    evento.preventDefault()
    setError('')

    if (!esEmailValido(formulario.correo)) {
      setError('Ingrese un correo electrónico válido.')
      return
    }
    if (!sonContrasenasIguales(formulario.password, formulario['confirm-password'])) {
      setError('Las contraseñas no coinciden.')
      return
    }

    setEnviando(true)
    try {
      await registrar({
        nombre: formulario.nombre,
        email: formulario.correo,
        password: formulario.password,
      })
      await login(formulario.correo, formulario.password)
      navegar('/servicios', { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <main>
      <form className="site-form" onSubmit={manejarEnvio}>
        <h3>registro de usuario</h3>
        <label htmlFor="nombre">nombre completo:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          required
          placeholder="Escribe tu nombre"
          value={formulario.nombre}
          onChange={actualizar}
        />
        <label htmlFor="correo">correo:</label>
        <input
          type="email"
          id="correo"
          name="correo"
          required
          placeholder="ejemplo@correo.com"
          value={formulario.correo}
          onChange={actualizar}
        />
        <label htmlFor="password">contraseña:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          value={formulario.password}
          onChange={actualizar}
        />
        <label htmlFor="confirm-password">confirmar contraseña:</label>
        <input
          type="password"
          id="confirm-password"
          name="confirm-password"
          required
          value={formulario['confirm-password']}
          onChange={actualizar}
        />
        {error && <p role="alert">{error}</p>}
        <button type="submit" disabled={enviando}>
          {enviando ? 'registrando...' : 'registrar'}
        </button>
      </form>
    </main>
  )
}
