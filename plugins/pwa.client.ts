export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    const router = useRouter()
    
    // Intercepte toutes les navigations
    router.beforeEach((to, from) => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches
      
      if (isStandalone) {
        // Force la navigation programmatique au lieu du rechargement
        if (to.fullPath !== from.fullPath) {
          // Empêche le rechargement complet
          return navigateTo(to.fullPath, { replace: false, external: false })
        }
      }
    })

    // Intercepte tous les clics sur les liens
    document.addEventListener('click', (e) => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches
      
      if (isStandalone) {
        const link = (e.target as HTMLElement).closest('a')
        
        if (link && link.href) {
          const url = new URL(link.href)
          const currentOrigin = window.location.origin
          
          // Si c'est un lien interne
          if (url.origin === currentOrigin) {
            e.preventDefault()
            e.stopPropagation()
            
            // Utilise navigateTo au lieu du comportement par défaut
            const path = url.pathname + url.search + url.hash
            navigateTo(path, { replace: false, external: false })
          }
        }
      }
    }, true) // Capture phase pour intercepter avant Ionic/Nuxt
  }
})
