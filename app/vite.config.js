import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@ds': fileURLToPath(
        new URL('../_ds/notary-desk-design-system-b9034183-23d5-457d-97f4-53be9fc253ad', import.meta.url)
      ),
    },
  },
})
