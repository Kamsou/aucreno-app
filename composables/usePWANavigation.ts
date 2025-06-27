export const usePWANavigation = () => {
  const router = useRouter()

  const isStandalone = computed(() => {
    if (import.meta.server) {
      return false
    }
    
    return window.matchMedia('(display-mode: standalone)').matches ||
           window.matchMedia('(display-mode: fullscreen)').matches ||
           (window.navigator as { standalone?: boolean }).standalone
  })

  const navigateSafely = (path: string) => {
    if (import.meta.client && isStandalone.value) {
      // En mode PWA, utiliser la navigation programmatique pour éviter de quitter l'app
      router.push(path)
    } else {
      // En mode navigateur normal, utiliser la navigation standard
      router.push(path)
    }
  }

  const openExternal = (url: string) => {
    if (import.meta.client) {
      if (isStandalone.value) {
        // En mode PWA, ouvrir dans un nouvel onglet pour éviter de quitter l'app
        window.open(url, '_blank', 'noopener,noreferrer')
      } else {
        // En mode navigateur, navigation normale
        window.location.href = url
      }
    }
  }

  return {
    isStandalone,
    navigateSafely,
    openExternal
  }
}
