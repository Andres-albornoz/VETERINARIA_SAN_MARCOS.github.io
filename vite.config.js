import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: './',

  plugins: [
    react(),  
    babel({ presets: [reactCompilerPreset()] }) //PARA GENEARL
    //!process.env.VITEST && babel({ presets: [reactCompilerPreset()] }) //DESACTIVAR REAC DURANTE PRUEVAS
  ],

  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
    include: ['src/**/*.test.{js,jsx}'],

    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/**/*.{js,jsx}'],
      exclude: ['src/**/*.test.{js,jsx}', 'src/test/**', 'src/main.jsx'],
    },
  },
})