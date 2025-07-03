export const useBrowserDetection = () => {
  if (import.meta.client) {
    const userAgent = navigator.userAgent.toLowerCase()
    const isIOS = /iphone|ipad|ipod/.test(userAgent)
    const isAndroid = /android/.test(userAgent)
    
    let browserClass = ''
    
    if (isIOS) {
      // Sur iOS, détection spécifique
      if (/crios/.test(userAgent)) {
        browserClass = 'chrome-ios'
      } else if (/safari/.test(userAgent) && !/chrome/.test(userAgent)) {
        browserClass = 'safari-ios'
      } else {
        browserClass = 'safari-ios' // Fallback pour iOS
      }
    } else if (isAndroid) {
      if (/chrome/.test(userAgent)) {
        browserClass = 'chrome-android'
      } else {
        browserClass = 'android-other'
      }
    } else {
      // Desktop
      if (/chrome/.test(userAgent) && !/edg/.test(userAgent)) {
        browserClass = 'chrome-desktop'
      } else if (/safari/.test(userAgent) && !/chrome/.test(userAgent)) {
        browserClass = 'safari-desktop'
      } else {
        browserClass = 'other-desktop'
      }
    }
    
    console.log('Browser detection:', {
      userAgent: navigator.userAgent,
      browserClass,
      isIOS,
      isAndroid
    })
    
    // Appliquer la classe au body
    document.body.classList.add(browserClass)
  }
}
