import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()

  if (to.path === '/login' && auth.isAuthenticated) {
    return navigateTo('/tabs/home')
  }
})
