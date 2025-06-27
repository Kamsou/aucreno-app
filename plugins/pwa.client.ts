// export default defineNuxtPlugin(() => {
//   if (import.meta.client) {
//     const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
//                         window.matchMedia('(display-mode: fullscreen)').matches ||
//                         (window.navigator as { standalone?: boolean }).standalone

//     // Créer une fonction globale pour la navigation PWA-safe
//     window.$navigatePWA = (path: string) => {
//       const router = useNuxtApp().$router
//       router.push(path)
//     }

//     if (isStandalone) {
//       // Mode PWA - ajuster la position de la tab bar pour les safe areas
//       const adjustTabBar = () => {
//         const tabBar = document.querySelector('.tab-bar-safari') as HTMLElement
//         if (tabBar) {
//           tabBar.style.bottom = 'env(safe-area-inset-bottom, 0px)'
//         }
//       }
//       setTimeout(adjustTabBar, 100)
      
//       // Réajuster si la taille change
//       window.addEventListener('resize', adjustTabBar)
//       window.addEventListener('orientationchange', () => {
//         setTimeout(adjustTabBar, 200)
//       })

//       // Intercepter tous les liens pour forcer la navigation interne
//       document.addEventListener('click', (e) => {
//         const target = e.target as HTMLElement
//         const link = target.closest('a')
        
//         if (link && link.href) {
//           const url = new URL(link.href)
//           const currentDomain = window.location.hostname
          
//           // Si c'est un lien interne, utiliser la navigation programmatique
//           if (url.hostname === currentDomain || url.href.startsWith('/')) {
//             e.preventDefault()
//             const router = useNuxtApp().$router
//             const path = url.pathname + url.search + url.hash
//             router.push(path)
//           } else if (!link.target) {
//             // Pour les liens externes, ouvrir dans un nouvel onglet
//             e.preventDefault()
//             window.open(link.href, '_blank', 'noopener,noreferrer')
//           }
//         }
//       })

//       // Intercepter la navigation programmatique pour s'assurer qu'elle reste dans l'app
//       const originalPushState = history.pushState
//       const originalReplaceState = history.replaceState
      
//       history.pushState = function(state, title, url) {
//         if (url && typeof url === 'string' && !url.startsWith('http')) {
//           return originalPushState.call(this, state, title, url)
//         }
//         return originalPushState.call(this, state, title, url)
//       }
      
//       history.replaceState = function(state, title, url) {
//         if (url && typeof url === 'string' && !url.startsWith('http')) {
//           return originalReplaceState.call(this, state, title, url)
//         }
//         return originalReplaceState.call(this, state, title, url)
//       }
//     }

//     // Empêcher le scroll de rebond sur iOS pour certains éléments
//     document.addEventListener('touchmove', (e) => {
//       if ((e.target as HTMLElement).closest('.prevent-scroll')) {
//         e.preventDefault()
//       }
//     }, { passive: false })
//   }
// })
