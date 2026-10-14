import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Servicios from './Servicios.jsx';

function renderServicios() {
  return render(
    <MemoryRouter>
      <Servicios />
    </MemoryRouter>
  );
}

describe('Servicios', () => {
  it('renderiza las 6 tarjetas de servicios', () => {
    renderServicios();
    expect(screen.getAllByRole('link')).toHaveLength(6);
  });

  it('cada tarjeta enlaza a /servicios/:id', () => {
    renderServicios();
    expect(screen.getByRole('link', { name: /consulta/i })).toHaveAttribute(
      'href',
      '/servicios/consulta'
    );
  });
});
