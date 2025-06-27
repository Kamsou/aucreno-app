export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                        window.matchMedia('(display-mode: fullscreen)').matches ||
                        (window.navigator as { standalone?: boolean }).standalone

    if (isStandalone) {
      // Mode PWA - ajuster la position de la tab bar pour les safe areas
      const adjustTabBar = () => {
        const tabBar = document.querySelector('.tab-bar-safari') as HTMLElement
        if (tabBar) {
          tabBar.style.bottom = 'env(safe-area-inset-bottom, 0px)'
        }
      }
      setTimeout(adjustTabBar, 100)
      
      // Réajuster si la taille change
      window.addEventListener('resize', adjustTabBar)
      window.addEventListener('orientationchange', () => {
        setTimeout(adjustTabBar, 200)
      })
    }

    // Empêcher le scroll de rebond sur iOS pour certains éléments
    document.addEventListener('touchmove', (e) => {
      if ((e.target as HTMLElement).closest('.prevent-scroll')) {
        e.preventDefault()
      }
    }, { passive: false })
  }
})
