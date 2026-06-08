import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Pin the dev port in source (not via a CLI --port flag) so `npm run dev`
    // behaves identically on Windows and Linux. Frontend runs on 3001; the
    // mock backend uses 3000.
    port: Number(process.env.FE_PORT ?? "3001"),
  },
})
