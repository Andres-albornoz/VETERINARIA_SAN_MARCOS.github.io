import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router';
import Layout from './Layout.jsx';

describe('Layout', () => {
  it('muestra la navegación, el contenido interno y el pie de página', () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<div>contenido de prueba</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /servicios/i })).toBeInTheDocument();
    expect(screen.getByText('contenido de prueba')).toBeInTheDocument();
    expect(screen.getByText(/todos los derechos reservados/i)).toBeInTheDocument();
  });
});
