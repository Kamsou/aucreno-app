export default defineNuxtConfig({
  
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
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Aucreno',
      short_name: 'Aucreno',
      description: "Fini les carnets : l'app gère ta planif' et ton suivi client.",
      theme_color: '#ffffff',
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
    workbox: {
      cleanupOutdatedCaches: true,
      navigateFallback: '/',
      navigateFallbackAllowlist: [/^\/$/],
    },
    devOptions: {
      enabled: false,
      suppressWarnings: true,
    },
    client: {
      installPrompt: true,
      registerPlugin: false
    },
  },
  vite: {
    css: {
      devSourcemap: false
    },
    build: {
      sourcemap: false,
      rollupOptions: {
        external: ['zlib', 'stream', 'http', 'https', 'url']
      }
    },
    optimizeDeps: {
      exclude: ['@supabase/realtime-js', '@supabase/node-fetch']
    },
    define: {
      global: 'globalThis',
    },
    logLevel: 'warn'
  },
  tailwindcss: {
    viewer: false,
    cssPath: false
  },
  nitro: {
    esbuild: {
      options: {
        target: 'esnext'
      }
    }
  },
})
