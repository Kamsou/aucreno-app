export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    const router = useRouter()
    
    // Intercepte uniquement les liens externes ou problématiques
    document.addEventListener('click', (e) => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches
      
      if (isStandalone) {
        const link = (e.target as HTMLElement).closest('a')
        
        if (link && link.href && !link.getAttribute('data-no-intercept')) {
          const url = new URL(link.href)
          const currentOrigin = window.location.origin
          
          // Intercepte uniquement les liens internes sans target="_blank"
          if (url.origin === currentOrigin && !link.target) {
            e.preventDefault()
            
            const path = url.pathname + url.search + url.hash
            // Utilise router.push au lieu de navigateTo pour éviter les conflits
            router.push(path)
          }
        }
      }
    }, true)
  }
})
