import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router';
import Layout from './Layout.jsx';
import { AuthProvider } from './AuthContext.jsx';

describe('Layout', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('muestra la navegación, el contenido interno y el pie de página', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<div>contenido de prueba</div>} />
            </Route>
          </Routes>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /servicios/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /ingresar/i })).toBeInTheDocument();
    expect(screen.getByText('contenido de prueba')).toBeInTheDocument();
    expect(screen.getByText(/todos los derechos reservados/i)).toBeInTheDocument();
  });
});
