import { Route, Routes } from 'react-router'
import Layout from './core/Layout.jsx'
import Index from './pages/Index.jsx'
import Servicios from './pages/Servicios.jsx'
import ServicioDetalle from './pages/ServicioDetalle.jsx'
import Nosotros from './pages/Nosotros.jsx'
import Blogs from './pages/Blogs.jsx'
import Blog1 from './pages/Blog1.jsx'
import Blog2 from './pages/Blog2.jsx'
import Contacto from './pages/contacto.jsx'
import Agendar from './pages/Agendar.jsx'
import Registro from './pages/Registro.jsx'
import Perfil from './pages/Perfil.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Index />} />
        <Route path="servicios" element={<Servicios />} />
        <Route path="servicios/:servicioId" element={<ServicioDetalle />} />
        <Route path="nosotros" element={<Nosotros />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="blogs/blog-1" element={<Blog1 />} />
        <Route path="blogs/blog-2" element={<Blog2 />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="agendar" element={<Agendar />} />
        <Route path="registro" element={<Registro />} />
        <Route path="perfil" element={<Perfil />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
