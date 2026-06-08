import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Pin to 3001 so the Playwright webServer config can reliably detect readiness.
    port: Number(process.env.FE_PORT ?? "3001"),
  },
})
