export function esEmailValido(correo) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
}

export function sonContrasenasIguales(password, confirmPassword) {
  return password.length > 0 && password === confirmPassword;
}
