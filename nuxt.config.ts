export default defineNuxtConfig({
  // nitro: {
  //   preset: 'static',
  //   prerender: {
  //     routes: ['/login', '/', '/tabs/clients', '/tabs/agenda']
  //   }
  // },
  app: {
    baseURL: '/',
    head: {
      title: 'Aucreno',
      meta: [
        { name: 'description', content: "Fini les carnets : l'app gère ta planif' et ton suivi client." },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no' },
        { name: 'theme-color', content: '#000000' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'apple-mobile-web-app-title', content: 'Aucreno' },
        { name: 'msapplication-TileColor', content: '#000000' },
        { name: 'msapplication-config', content: '/browserconfig.xml' }
      ],
      link: [
        { rel: 'canonical', href: 'https://app.aucreno.com' },
        { rel: 'apple-touch-icon', href: '/icon-192.png' },
        { rel: "manifest", href: "/manifest.json"}
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
      start_url: '/',
      scope: '/',
      lang: "fr",
      orientation: 'portrait',
      id: '/',
      background_color: '#ffffff',
      icons: [
        {
          src: '/icon-192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: '/icon-512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ],
    },
    registerType: 'autoUpdate',
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}']
    },
    client: {
      installPrompt: true
    }
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
