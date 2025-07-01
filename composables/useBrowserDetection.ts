export default function useBrowserDetection() {
  const browserInfo = ref({
    isSafari: false,
    isChrome: false,
    isIOS: false,
    isAndroid: false,
    isChromeIOS: false,
    isSafariIOS: false
  })

  const detectBrowser = () => {
    if (!import.meta.client) {
      return
    }

    const userAgent = navigator.userAgent.toLowerCase()
    const isIOS = /iphone|ipad|ipod/.test(userAgent)
    const isAndroid = /android/.test(userAgent)
    
    // Détection Chrome iOS (Chrome sur iOS utilise WebKit mais garde "Chrome" dans l'UA)
    const isChromeIOS = isIOS && (/crios/.test(userAgent) || /chrome/.test(userAgent))
    
    // Détection Safari iOS (Safari natif iOS - pas Chrome, pas Firefox, etc.)
    const isSafariIOS = isIOS && !isChromeIOS && !(/firefox|fxios|edgios|opera|opios/.test(userAgent))
    
    // Détection Chrome (général)
    const isChrome = /chrome/.test(userAgent) && !/edg|opr/.test(userAgent)
    
    // Détection Safari (général)
    const isSafari = /safari/.test(userAgent) && !/chrome|edg|opr/.test(userAgent)

    browserInfo.value = {
      isSafari,
      isChrome,
      isIOS,
      isAndroid,
      isChromeIOS,
      isSafariIOS
    }

    // Ajouter les classes CSS correspondantes au body
    const body = document.body
    
    // Nettoyer les anciennes classes
    body.classList.remove('safari-ios', 'chrome-ios', 'safari', 'chrome', 'ios', 'android')
    
    // Ajouter les nouvelles classes
    if (isSafariIOS) {
      body.classList.add('safari-ios')
      console.log('🍎 Safari iOS détecté - classe safari-ios ajoutée')
    }
    if (isChromeIOS) {
      body.classList.add('chrome-ios')
      console.log('🟢 Chrome iOS détecté - classe chrome-ios ajoutée')
    }
    if (isSafari) {
      body.classList.add('safari')
    }
    if (isChrome) {
      body.classList.add('chrome')
    }
    if (isIOS) {
      body.classList.add('ios')
    }
    if (isAndroid) {
      body.classList.add('android')
    }

    return browserInfo.value
  }

  const logBrowserInfo = () => {
    if (import.meta.client) {
      console.log('🌐 Browser Detection Info:', {
        ...browserInfo.value,
        userAgent: navigator.userAgent
      })
    }
  }

  onMounted(() => {
    detectBrowser()
    if (process.env.NODE_ENV === 'development') {
      logBrowserInfo()
    }
  })

  return {
    browserInfo: readonly(browserInfo),
    detectBrowser,
    logBrowserInfo
  }
}
