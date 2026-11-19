import { test, expect } from '@playwright/test'

const token = `header.${Buffer.from(
  JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 3600 }),
).toString('base64url')}.firma`

const servicios = [
  {
    codigo: 1,
    categoria: 'Consulta',
    nombre: 'Consulta general',
    especie: 'Perro',
    duracion: 30,
    precio: 15000,
    observaciones: 'Control general',
  },
]

test.beforeEach(async ({ page }) => {
  await page.route('**/api/auth/login', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ token, email: 'user@user.cl', roles: 'USER' }),
    })
  })

  await page.route('**/api/servicios', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(servicios),
    })
  })
})

test('hace login y carga los servicios reales desde la API', async ({ page }) => {
  await page.goto('/#/login')
  await page.getByLabel('correo:').fill('user@user.cl')
  await page.getByLabel('contraseña:').fill('user123')

  const peticion = page.waitForRequest(/\/api\/servicios(\?|$)/)
  await page.getByRole('button', { name: 'ingresar' }).click()

  const solicitud = await peticion
  expect(solicitud.headers()['authorization']).toBe(`Bearer ${token}`)
  await expect(page.getByText('Consulta general')).toBeVisible()
})

test('muestra el error de la API al cargar servicios', async ({ page }) => {
  await page.addInitScript(
    (datos) => {
      window.localStorage.setItem('veterinaria_san_marcos_auth', JSON.stringify(datos))
    },
    { token, email: 'user@user.cl', roles: 'USER' },
  )
  await page.route('**/api/servicios', async (route) => {
    await route.fulfill({
      status: 401,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'No autorizado' }),
    })
  })

  await page.goto('/#/servicios')

  await expect(page.getByRole('alert')).toContainText('No autorizado')
})
