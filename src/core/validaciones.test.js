import { describe, it, expect } from 'vitest';
import { esEmailValido, sonContrasenasIguales } from './validaciones.js';

describe('validaciones (unitarias)', () => {
  it('acepta un correo válido', () => {
    expect(esEmailValido('cliente@example.com')).toBe(true);
  });

  it('rechaza correos inválidos', () => {
    expect(esEmailValido('cliente@')).toBe(false);
    expect(esEmailValido('sin-arroba.com')).toBe(false);
  });

  it('detecta contraseñas coincidentes', () => {
    expect(sonContrasenasIguales('abc123', 'abc123')).toBe(true);
  });

  it('rechaza contraseñas distintas o vacías', () => {
    expect(sonContrasenasIguales('abc123', 'xyz')).toBe(false);
    expect(sonContrasenasIguales('', '')).toBe(false);
  });
});
