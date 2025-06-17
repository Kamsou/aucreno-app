import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()
  // Si déjà connecté et on veut accéder à /login, on redirige
  if (to.path === '/login' && auth.isAuthenticated) {
    return navigateTo('/tabs/home')
  }
})
