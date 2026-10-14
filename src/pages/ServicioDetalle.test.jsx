import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router';
import ServicioDetalle from './ServicioDetalle.jsx';

function renderServicio(id) {
  return render(
    <MemoryRouter initialEntries={[`/servicios/${id}`]}>
      <Routes>
        <Route path="/servicios/:servicioId" element={<ServicioDetalle />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('ServicioDetalle', () => {
  it('traduce el id a un nombre legible', () => {
    renderServicio('vacunacion');
    expect(screen.getByText('vacunación')).toBeInTheDocument();
  });

  it('si el id no está en el mapa, muestra el id tal cual', () => {
    renderServicio('noexiste');
    expect(screen.getAllByText(/noexiste/i).length).toBeGreaterThan(0);
  });
});
