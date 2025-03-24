import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import jsconfigPaths from 'vite-jsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      react(),
      jsconfigPaths(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
        manifest: {
          name: 'That Feed',
          short_name: 'ThatFeed',
          description: 'Your news feed done right',
          theme_color: '#C8FA17',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            }
          ],
          screenshots: [
            // Desktop/wide form factor
            {
              src: 'screenshot-wide.png',
              sizes: '1280x800',
              type: 'image/png',
              form_factor: 'wide',
              label: 'That Feed Desktop View'
            },
            // Mobile form factor
            {
              src: 'screenshot-mobile.png',
              sizes: '390x844',
              type: 'image/png',
              label: 'That Feed Mobile View'
            }
          ]
        }
      })
    ],
  server: {
    port: 8100,  // testing for google signup/in oauth
  }
})
