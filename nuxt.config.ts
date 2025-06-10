export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@vite-pwa/nuxt'],
  pwa: {
    manifest: {
      name: 'Aucreno',
      short_name: 'Aucreno',
      theme_color: '#000000',
      display: 'standalone',
      background_color: '#ffffff',
      icons: [
        {
          src: '/icon-192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/icon-512.png',
          sizes: '512x512',
          type: 'image/png',
        }
      ],
    },
    registerType: 'autoUpdate',
  },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL || '',
      supabaseKey: process.env.SUPABASE_KEY || '',
    },
  },
})
