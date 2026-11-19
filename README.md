# Veterinaria San Marcos (frontend)

Frontend React + Vite del proyecto. Consume la API REST del backend Spring Boot ubicado en `../backend_veterinaria`.

## Requisitos

- Node.js 20+ (CI usa 24)
- Java 21 y Maven (o usar `./mvnw`) para el backend

## Ejecución en local

Terminal 1 — backend (puerto 8080):

```bash
cd ../backend_veterinaria
./mvnw spring-boot:run     # Windows: .\mvnw.cmd spring-boot:run
```

Terminal 2 — frontend (puerto 5173):

```bash
npm ci
npm run dev
```

Vite redirige `/api/**` a `http://localhost:8080` (ver `vite.config.js`), así que no hace falta crear `.env` en local. Si quieres apuntar a otro backend, copia `.env.example` a `.env` y cambia `VITE_API_URL`.

Usuarios de prueba creados por el backend:

| Correo | Contraseña | Rol |
|---|---|---|
| admin@admin.cl | admin123 | ADMIN |
| user@user.cl | user123 | USER |

## Conexión con el backend

- `POST /api/auth/login` → `{ token, email, roles }`. El token se guarda en `localStorage` y se envía como `Authorization: Bearer <token>`.
- `POST /api/auth/register` → `{ nombre, email, password }`. El campo `telefono` se quitó del formulario porque el backend no lo almacena.
- `GET /api/servicios` y `GET /api/servicios/{codigo}` → listado y detalle reales (el detalle usa el `codigo` numérico del backend).
- Las rutas `servicios`, `servicios/:id`, `agendar` y `perfil` exigen sesión; si no hay token redirigen a `/login`.
- Los errores de la API (`{"error": ...}` o texto plano) se muestran al usuario.

Aún sin endpoint en el backend: agenda de citas, formulario de contacto y mascotas. Esos formularios siguen siendo de maquetación.

## Despliegue en GitHub Pages

El backend debe estar desplegado (por ejemplo en Render/Railway) y su URL configurada como variable del repositorio:

1. GitHub → Settings → Secrets and variables → Actions → Variables → `VITE_API_URL` = `https://TU-BACKEND/api`.
2. El workflow `deploy.yml` inyecta esa variable en `npm run build`.
3. El backend debe permitir el origen `https://andres-albornoz.github.io` en `cors.allowed-origins` (ya está en el default de `application.properties`; si usas `CORS_ALLOWED_ORIGINS`, agrégalo).

## Comandos

```bash
npm run dev          # desarrollo
npm run build        # compilar dist/
npm run preview      # sirve dist/ en :4173 (proxy /api incluido)
npm run lint         # ESLint
npm run test:run     # Vitest
npm run test:e2e     # Playwright (requiere backend en :8080)
```
