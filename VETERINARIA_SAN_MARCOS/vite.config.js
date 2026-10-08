import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],

  // ...plugins
  test: {
    environment: 'jsdom',            // usar el DOM simulado
    globals: true,                   // describe/it/expect disponibles sin importar
    setupFiles: './src/test/setup.js',
    include: ['src/**/*.test.{js,jsx}'],
  },

})
