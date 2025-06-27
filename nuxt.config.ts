export default defineNuxtConfig({
  nitro: {
    preset: 'static',
    prerender: {
      routes: ['/login', '/', '/tabs/clients', '/tabs/agenda']
    }
  },
  app: {
    baseURL: '/',
    head: {
      title: 'Aucreno',
      meta: [
        { name: 'description', content: "Fini les carnets : l'app gère ta planif' et ton suivi client." },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no' },
        { name: 'theme-color', content: '#000000' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }
      ],
      link: [
        { rel: 'canonical', href: 'https://app.aucreno.com' },
        { rel: 'apple-touch-icon', href: '/icon-192.png' }
      ]
    }
  },
  ssr: false,
  experimental: {
    payloadExtraction: false
  },
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },
  modules: [
    '@vite-pwa/nuxt',
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxtjs/ionic',
    '@nuxtjs/supabase',
    '@pinia/nuxt'
  ],
  css: ['@/assets/ionic.css', '@/assets/main.css'],
  pwa: {
    manifest: {
      name: 'Aucreno',
      short_name: 'Aucreno',
      description: "Fini les carnets : l'app gère ta planif' et ton suivi client.",
      theme_color: '#000000',
      display: 'standalone',
      display_override: ['standalone', 'fullscreen'],
      start_url: '/',
      scope: '/',
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
    workbox: {
      navigateFallback: '/',
      navigateFallbackDenylist: [/^\/api\//, /^\/_nuxt\//],
      runtimeCaching: [
        {
          urlPattern: ({ request }) => request.destination === 'document',
          handler: 'NetworkFirst',
          options: {
            cacheName: 'pages',
            expiration: {
              maxEntries: 32,
              maxAgeSeconds: 24 * 60 * 60, // 24 hours
            },
          },
        },
      ],
    },
  },
  components: [
    { path: '~/components/generic', pathPrefix: false },
    { path: '~/components/specific', pathPrefix: false },
  ],
  supabase: {
    redirect: false,
  },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    },
  },
})
