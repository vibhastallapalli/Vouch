import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { createReadStream, existsSync, statSync } from 'node:fs'
import { join, normalize } from 'node:path'

const zkRoot = fileURLToPath(new URL('../contract/contracts/managed/rentpool', import.meta.url))

// Serve the committed circuit artifacts (keys, zkir) at /zk/rentpool so the
// proving provider can fetch key material from the app origin once chain mode
// turns on. Dev server only; the deploy task copies the same folder into the
// production bundle when a production host exists.
const zkAssets = () => ({
  name: 'zk-assets',
  configureServer(server) {
    server.middlewares.use('/zk/rentpool', (req, res, next) => {
      const rel = normalize(decodeURIComponent(req.url.split('?')[0])).replace(/^([/\\])+/, '')
      const file = join(zkRoot, rel)
      if (!file.startsWith(zkRoot) || !existsSync(file) || !statSync(file).isFile()) return next()
      res.setHeader('Content-Type', 'application/octet-stream')
      createReadStream(file).pipe(res)
    })
  },
})

export default defineConfig({
  plugins: [react(), zkAssets()],
  resolve: {
    alias: {
      '@ds': fileURLToPath(
        new URL('../_ds/notary-desk-design-system-b9034183-23d5-457d-97f4-53be9fc253ad', import.meta.url)
      ),
    },
  },
})
