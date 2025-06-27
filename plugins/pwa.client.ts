export default defineNuxtPlugin(() => {
  // Forcer le mode plein écran pour PWA et masquer les barres Safari
  if (import.meta.client) {
    // Détecter si on est en mode PWA
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                        window.matchMedia('(display-mode: fullscreen)').matches ||
                        (window.navigator as { standalone?: boolean }).standalone

    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    const isMobile = window.innerWidth <= 768

    // Fonction pour masquer les barres Safari
    const hideAddressBar = () => {
      if (isSafari && !isStandalone && isMobile) {
        setTimeout(() => {
          window.scrollTo(0, 1)
          setTimeout(() => window.scrollTo(0, 0), 50)
        }, 100)
      }
    }

    if (isStandalone) {
      // Mode PWA - ajuster la position de la tab bar
      const adjustTabBar = () => {
        const tabBar = document.querySelector('.tab-bar-safari') as HTMLElement
        if (tabBar) {
          tabBar.style.bottom = 'env(safe-area-inset-bottom, 0px)'
        }
      }
      setTimeout(adjustTabBar, 100)
    } else if (isSafari && isMobile) {
      // Mode Safari web - masquer les barres sur toutes les pages
      
      // Masquer au chargement initial
      window.addEventListener('load', hideAddressBar)
      
      // Masquer lors des changements d'orientation
      window.addEventListener('orientationchange', () => {
        setTimeout(hideAddressBar, 200)
      })

      // Masquer lors du redimensionnement
      window.addEventListener('resize', hideAddressBar)

      // Masquer lors du scroll (pour maintenir l'état)
      let scrollTimeout: number
      window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout)
        scrollTimeout = window.setTimeout(() => {
          if (window.pageYOffset === 0) {
            hideAddressBar()
          }
        }, 300)
      })

      // Masquer lors des changements de route
      const nuxtApp = useNuxtApp()
      nuxtApp.hook('page:finish', () => {
        setTimeout(hideAddressBar, 200)
      })
    }

    // Empêcher le scroll de la page principale si nécessaire
    document.addEventListener('touchmove', (e) => {
      if ((e.target as HTMLElement).closest('.prevent-scroll')) {
        e.preventDefault()
      }
    }, { passive: false })
  }
})
