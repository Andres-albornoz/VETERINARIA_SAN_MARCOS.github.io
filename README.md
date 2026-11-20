# Veterinaria San Marcos — Frontend

SPA de la veterinaria construida con **React 19 + Vite 8** y estilos propios en `src/index.css` (no se usa Bootstrap ni otro framework de CSS). Consume la API REST del proyecto `backend_veterinaria`.

## Requisitos

- Node.js 20+ (CI usa 24)
- Backend Spring Boot corriendo en `http://localhost:8080` (ver su propio README)

## Ejecución en local

Terminal 1 — backend:

```bash
cd ../backend_veterinaria
.\mvnw.cmd spring-boot:run     # Linux/Mac: ./mvnw spring-boot:run
```

Terminal 2 — frontend:

```bash
npm ci
npm run dev
```

Abre `http://localhost:5173`. Vite redirige `/api/**` a `http://localhost:8080` (ver `vite.config.js`), así que no hace falta crear `.env` para trabajar en local.

## Usuarios de prueba

Creados por el `DataSeeder` del backend:

| Correo | Contraseña | Rol |
|---|---|---|
| admin@admin.cl | admin123 | ADMIN |
| user@user.cl | user123 | USER |

## Integración con el backend

`src/services/api.js` es el único punto de comunicación:

- `POST /api/auth/login` → `{ token, email, roles }`.
- El token se guarda en `localStorage` y se envía como `Authorization: Bearer <token>` en cada petición.
- `GET /api/servicios` y `GET /api/servicios/{codigo}` → listado y detalle reales.
- `POST`, `PUT` y `DELETE /api/servicios` → creación, edición y borrado (solo ADMIN).
- Errores de la API (`{"error": ...}` o texto plano) se convierten en `ApiError` y se muestran al usuario.
- Si el backend no responde, se muestra un mensaje de conexión y un botón de reintentarlo.

La documentación de todos los endpoints está en el backend: `http://localhost:8080/swagger-ui/index.html` (JSON en `/v3/api-docs`).

## Sesión y permisos

### Sesión persistente

`AuthContext` mantiene `{ token, email, roles }`. Al cargar la app, `sesionInicial()` lee `localStorage` y descarta el token si está vencido (decodifica el `exp` del JWT). `logout()` borra la sesión. Por eso la sesión sobrevive a recargas de página.

### Restricciones por rol

| Superficie | Usuario normal | Administrador |
|---|---|---|
| Rutas `servicios`, `servicios/:id`, `agendar`, `perfil` | Acceso si inició sesión (`ProtectedRoute`) | Igual |
| Menú “perfil” / “cerrar sesión” | Visible solo autenticado (`Layout`) | Igual |
| Botones **nuevo servicio / editar / eliminar** | Ocultos | Visibles y funcionales |

El frontend oculta los controles con `esAdmin` (`usuario.roles === 'ADMIN'`), pero la seguridad real está en el backend: los endpoints de escritura tienen `@PreAuthorize("hasRole('ADMIN')")` y devuelven `403` a un usuario normal. Ingresa con `admin@admin.cl` para probar la administración de servicios.

## Estado del catálogo

- La página **Servicios** y su detalle consumen datos reales del backend.
- El inicio muestra las seis categorías del proyecto original; sus enlaces llevan a una vista de detalle “legacy” cuando el parámetro no es un ID numérico.
- Aún sin endpoint en el backend: agenda de citas, formulario de contacto y mascotas. Esos formularios siguen siendo de maquetación (no envían datos).

## Despliegue en GitHub Pages

El backend debe estar desplegado (por ejemplo en Render/Railway) y su URL configurada como variable del repositorio:

1. GitHub → Settings → Secrets and variables → Actions → Variables → `VITE_API_URL` = `https://TU-BACKEND/api`.
2. El workflow `.github/workflows/deploy.yml` inyecta esa variable en `npm run build`.
3. El backend debe permitir el origen `https://andres-albornoz.github.io` en `cors.allowed-origins` (ya está en el valor por defecto).

## Pruebas y calidad

```bash
npm run dev          # desarrollo
npm run build        # compilar dist/
npm run preview      # sirve dist/ en :4173
npm run lint         # ESLint
npm run test:run     # Vitest (22 pruebas unitarias)
npm run test:e2e     # Playwright (requiere el backend o las rutas simuladas)
```

El workflow de GitHub Actions ejecuta `lint`, `test:run` y `build` antes de publicar en Pages.

## Estructura

```
src/
  core/        AuthContext, ProtectedRoute, Layout, validaciones
  pages/       Index, Servicios, ServicioDetalle, Login, Perfil, etc.
  services/    api.js (fetch + Bearer) y storage.js (localStorage)
  test/        configuración de Vitest
e2e/           pruebas de Playwright (login, carga de servicios, errores)
```
