export const useHideSafariBars = () => {
  const hideAddressBars = () => {
    // Vérifier si on est sur Safari mobile
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    const isMobile = window.innerWidth <= 768

    if (isSafari && !isStandalone && isMobile) {
      // Technique pour masquer les barres Safari
      setTimeout(() => {
        // Scroll léger vers le bas puis retour
        window.scrollTo(0, 1)
        setTimeout(() => {
          window.scrollTo(0, 0)
        }, 50)
      }, 100)
    }
  }

  return {
    hideAddressBars
  }
}
