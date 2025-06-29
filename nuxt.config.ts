export default defineNuxtConfig({
  // app: {
  //   // baseURL: '/',
  //   head: {
  //     // title: 'Aucreno',
  //     // meta: [
  //     //   { name: 'description', content: "Fini les carnets : l'app gère ta planif' et ton suivi client." },
  //     //   { name: 'viewport', content: 'width=device-width, initial-scale=1.0, 
  // viewport-fit=cover, user-scalable=no' },
  //     //   { name: 'theme-color', content: '#000000' },
  //     //   { name: 'apple-mobile-web-app-capable', content: 'yes' },
  //     //   { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
  //     //   { name: 'apple-mobile-web-app-title', content: 'Aucreno' },
  //     //   { name: 'msapplication-TileColor', content: '#000000' },
  //     //   { name: 'msapplication-config', content: '/browserconfig.xml' }
  //     // ],
  //     link: [
  //       // { rel: 'canonical', href: 'https://app.aucreno.com' },
  //       // { rel: 'apple-touch-icon', href: '/icon-192.png' },
  //       // { rel: "manifest", href: "/manifest.json"}
  //     ]
  //   }
  // },
  // experimental: {
  //   payloadExtraction: false
  // },
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
      lang: "fr",
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
    // registerType: 'autoUpdate',
    // workbox: {
    //   navigateFallback: '/',
    //   navigateFallbackDenylist: [
    //     /^\/api\//,
    //     /^\/admin\//,
    //     /^\/_nuxt\//,
    //     /^\/assets\//,
    //   ],
    //   globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    //   runtimeCaching: [
    //     {
    //       urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
    //       handler: 'CacheFirst',
    //       options: {
    //         cacheName: 'google-fonts-cache',
    //         expiration: {
    //           maxEntries: 10,
    //           maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
    //         },
    //         cacheableResponse: {
    //           statuses: [0, 200]
    //         }
    //       }
    //     },
    //     {
    //       urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
    //       handler: 'CacheFirst',
    //       options: {
    //         cacheName: 'gstatic-fonts-cache',
    //         expiration: {
    //           maxEntries: 10,
    //           maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
    //         },
    //         cacheableResponse: {
    //           statuses: [0, 200]
    //         }
    //       }
    //     }
    //   ],
    //   cleanupOutdatedCaches: true,
    // },
    workbox: {
      navigateFallback: "/",

    },
    devOptions: {
      enabled: true, 
      type: "module"
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
