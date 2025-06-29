export default function usePWADetection() {
  const isPWA = ref(false)
  const pwaSource = ref('')
  const isReady = ref(false)

  const detectPWAMode = () => {
    if (!import.meta.client) {
      pwaSource.value = 'server'
      return false
    }

    // Méthode 1: display-mode (la plus fiable pour PWA)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    
    // Méthode 2: navigator.standalone (iOS Safari)
    const nav = window.navigator as { standalone?: boolean }
    const iOSStandalone = 'standalone' in window.navigator && nav.standalone
    
    // Méthode 3: URL avec paramètre pwa (optionnel)
    const urlParams = new URLSearchParams(window.location.search)
    const urlPWA = urlParams.get('pwa') === 'true'

    if (isStandalone) {
      isPWA.value = true
      pwaSource.value = 'display-mode'
    } else if (iOSStandalone) {
      isPWA.value = true
      pwaSource.value = 'ios-standalone'
    } else if (urlPWA) {
      isPWA.value = true
      pwaSource.value = 'url-parameter'
    } else {
      isPWA.value = false
      pwaSource.value = 'browser'
    }

    isReady.value = true
    return isPWA.value
  }

  const getPWAInfo = () => {
    if (!import.meta.client) {
      return {
        isPWA: false,
        source: 'server',
        userAgent: 'N/A',
        displayMode: 'N/A',
        isReady: false
      }
    }

    return {
      isPWA: isPWA.value,
      source: pwaSource.value,
      userAgent: navigator.userAgent,
      displayMode: window.matchMedia('(display-mode: standalone)').matches ? 'standalone' : 'browser',
      isReady: isReady.value
    }
  }

  const logPWAInfo = () => {
    if (import.meta.client) {
      const info = getPWAInfo()
      console.log('🚀 PWA Detection Info:', info)
    }
  }

  onMounted(() => {
    detectPWAMode()
    if (process.env.NODE_ENV === 'development') {
      logPWAInfo()
    }
  })

  return {
    isPWA: readonly(isPWA),
    pwaSource: readonly(pwaSource),
    isReady: readonly(isReady),
    detectPWAMode,
    getPWAInfo,
    logPWAInfo
  }
}
