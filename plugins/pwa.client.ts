export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    const router = useRouter()
    
    document.addEventListener('click', (e) => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches
      
      if (isStandalone) {
        const link = (e.target as HTMLElement).closest('a')
        
        if (link && link.href && !link.getAttribute('data-no-intercept')) {
          const url = new URL(link.href)
          const currentOrigin = window.location.origin
          
          if (url.origin === currentOrigin && !link.target) {
            e.preventDefault()
            
            const path = url.pathname + url.search + url.hash
            router.push(path)
          }
        }
      }
    }, true)
  }
})
