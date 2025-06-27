export default defineNuxtRouteMiddleware(() => {
  // Côté client uniquement
  if (import.meta.client) {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                        window.matchMedia('(display-mode: fullscreen)').matches ||
                        (window.navigator as { standalone?: boolean }).standalone

    if (isStandalone) {
      // S'assurer que les métadonnées viewport sont correctes pour PWA
      const viewportMeta = document.querySelector('meta[name="viewport"]')
      if (viewportMeta) {
        viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no')
      }

      // Empêcher le pull-to-refresh qui peut causer des problèmes
      document.body.style.overscrollBehavior = 'none'
      
      // S'assurer que la barre d'état est configurée correctement
      const statusBarMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')
      if (statusBarMeta) {
        statusBarMeta.setAttribute('content', 'default')
      }
    }
  }
})
