import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // Embed de Wistia como web component — no tratarlo como componente Vue
          isCustomElement: (tag) => tag === 'wistia-player',
        },
      },
    }),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Solo variables y mixins (no emiten CSS) — lo global va en global.scss
        additionalData: `@use "@/styles/colorVariables.module.scss" as *; @use "@/styles/fonts.modules.scss" as *;`,
      },
    },
  },
  server: {
    port: 5173,
    // Añade aquí tu túnel (ngrok, cloudflared) para probar en el celular
    allowedHosts: ['.ngrok-free.app', '.trycloudflare.com'],
  },
})
