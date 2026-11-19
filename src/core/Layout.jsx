import { NavLink, Link, Outlet } from 'react-router'
import carrito from '../assets/carrito.png'
import { useAuth } from './authContext.js'

function Layout() {
  const { autenticado, logout } = useAuth()

  return (
    <div className="site">
      <header>
        <h1>
          <Link to="/">VETERINARIA SAN MARCOS</Link>
        </h1>
        <nav>
          |
          <NavLink to="/">home</NavLink> |
          <NavLink to="/servicios">servicios</NavLink> |
          <NavLink to="/nosotros">nosotros</NavLink> |
          <NavLink to="/blogs">blogs</NavLink> |
          <NavLink to="/contacto">contacto</NavLink> |
          {autenticado ? (
            <>
              <NavLink to="/perfil">perfil</NavLink> |
              <button type="button" className="nav-logout" onClick={logout}>
                cerrar sesión
              </button>{' '}
              |
            </>
          ) : (
            <>
              <NavLink to="/login">ingresar</NavLink> |
            </>
          )}
          <Link to="/agendar" className="carrito">
            <img src={carrito} alt="agendar consulta" />
          </Link>
          |
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>© 2024 VETERINARIA SAN MARCOS. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}

export default Layout
