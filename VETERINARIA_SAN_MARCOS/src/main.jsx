import { createHashRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Layout from './core/Layout.jsx';
import Index from './pages/Index.jsx';
import Servicios from './pages/Servicios.jsx';
import ServicioDetalle from './pages/ServicioDetalle.jsx';
import Nosotros from './pages/Nosotros.jsx';
import Blogs from './pages/Blogs.jsx';
import Blog1 from './pages/Blog1.jsx';
import Blog2 from './pages/Blog2.jsx';
import Contacto from './pages/contacto.jsx';
import Agendar from './pages/Agendar.jsx';
import Registro from './pages/Registro.jsx';
import Perfil from './pages/Perfil.jsx';

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Index /> },
      { path: 'servicios', element: <Servicios /> },
      { path: 'servicios/:servicioId', element: <ServicioDetalle /> },
      { path: 'nosotros', element: <Nosotros /> },
      { path: 'blogs', element: <Blogs /> },
      { path: 'blogs/blog-1', element: <Blog1 /> },
      { path: 'blogs/blog-2', element: <Blog2 /> },
      { path: 'contacto', element: <Contacto /> },
      { path: 'agendar', element: <Agendar /> },
      { path: 'registro', element: <Registro /> },
      { path: 'perfil', element: <Perfil /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(<RouterProvider router={router} />);
