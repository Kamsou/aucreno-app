# Aucreno app - Coaching sportif 1:1

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## 🚀 Stack technique

- [Nuxt 3](https://nuxt.com/) — Framework Vue.js universel
- [Ionic Vue](https://ionicframework.com/docs/vue/) — UI mobile & composants natifs
- [Capacitor](https://capacitorjs.com/) — Déploiement natif mobile
- [Supabase](https://supabase.com/) — Backend as a service (Postgres, Auth, Storage)
- [@vite-pwa/nuxt](https://vite-pwa-org.netlify.app/frameworks/nuxt) — PWA moderne

## Setup

Make sure to install dependencies:

```bash
yarn install
```

##  Configure les variables d'environnement

```bash
cp .env.example .env
```

# Ajoute tes clés Supabase dans .env
```bash
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
yarn dev
```

## Production

Build the application for production:

```bash
yarn build
```

Locally preview production build:

```bash
yarn preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
