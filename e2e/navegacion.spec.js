import { test, expect } from '@playwright/test'

const token = `header.${Buffer.from(
  JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 3600 }),
).toString('base64url')}.firma`

async function simularSesion(page) {
  await page.addInitScript(
    (datos) => {
      window.localStorage.setItem('veterinaria_san_marcos_auth', JSON.stringify(datos))
    },
    { token, email: 'user@user.cl', roles: 'USER' },
  )
  await page.route('**/api/servicios', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        {
          codigo: 1,
          categoria: 'Consulta',
          nombre: 'Consulta general',
          duracion: 30,
          precio: 15000,
          observaciones: '',
        },
      ]),
    })
  })
}

test('Carga la pagina principal de la veterinaria', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('body')).toContainText(/veterinaria/i)
})

test('Sin sesion, ir a servicios redirige al login', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: /servicios/i }).first().click()
  await expect(page).toHaveURL(/.*login/)
})

test('Con sesion, ir a servicios muestra el listado de la API', async ({ page }) => {
  await simularSesion(page)
  await page.goto('/')
  await page.getByRole('link', { name: /servicios/i }).first().click()
  await expect(page).toHaveURL(/.*servicios/)
  await expect(page.getByText('Consulta general')).toBeVisible()
})

test('Ir hacia la seccion de contacto', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: /contacto/i }).first().click()
  await expect(page).toHaveURL(/.*contacto/)
})

test('Muestra error 404 por ruta inexistente', async ({ page }) => {
  await page.goto('/#/ruta-no-existente')
  await expect(page.locator('body')).toContainText(/404|No existe/i)
})
