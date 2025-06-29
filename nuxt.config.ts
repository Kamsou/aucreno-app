export default defineNuxtConfig({
  ssr: false, // mode SPA uniquement côté client
  pwa: {
    registerType: 'autoUpdate',
    devOptions: {
      enabled: false, // évite les bugs de SW en développement
    },
    workbox: {
      cleanupOutdatedCaches: true,
      runtimeCaching: [
        {
          urlPattern: '^https://.*\\.(png|jpg|jpeg|svg|gif|webp|woff2?)$',
          handler: 'CacheFirst',
          options: {
            cacheName: 'images',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 24 * 30, // 30 jours
            },
          },
        },
        {
          urlPattern: '^https://.*',
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api',
            networkTimeoutSeconds: 10,
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 24,
            },
          },
        },
      ],
    },
    manifest: {
      name: 'Mon App Nuxt',
      short_name: 'AppNuxt',
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#DD4400', // ou celle de ta charte
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
        },
      ],
    },
  },

  app: {
    head: {
      title: 'Mon App Nuxt',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' },
        { name: 'theme-color', content: '#DD4400' },
      ],
    },
  },

  vite: {
    build: {
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name].[hash][extname]',
          chunkFileNames: 'js/[name].[hash].js',
          entryFileNames: 'js/[name].[hash].js',
        },
      },
    },
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
  // pwa: {
  //   registerType: 'autoUpdate',
  //   manifest: {
  //     name: 'Aucreno',
  //     short_name: 'Aucreno',
  //     description: "Fini les carnets : l'app gère ta planif' et ton suivi client.",
  //     theme_color: '#000000',
  //     lang: "fr",
  //     icons: [
  //       {
  //         src: '/icon-192.png',
  //         sizes: '192x192',
  //         type: 'image/png',
  //         purpose: 'any maskable'
  //       },
  //       {
  //         src: '/icon-512.png',
  //         sizes: '512x512',
  //         type: 'image/png',
  //         purpose: 'any maskable'
  //       }
  //     ],
  //   },
  //   workbox: {
  //     navigateFallback: '/',
  //     navigateFallbackDenylist: [
  //       /^\/api\//,
  //       /^\/admin\//,
  //       /^\/_nuxt\//,
  //       /^\/assets\//,
  //       /^\/__nuxt_test\//,
  //       /^\/@vite\//,
  //     ],
  //   },
  //   devOptions: {
  //     enabled: false,
  //     suppressWarnings: true,
  //   },
  //   client: {
  //     installPrompt: true,
  //     registerPlugin: false
  //   },
  // },
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
