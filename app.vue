<script setup lang="ts">
const router = useRouter()
const allRoutes = router.getRoutes().map(r => r.path)

const { direction, updateDirection } = usePageDirection()
const transitionName = ref('slide-forward')

const isMobile = ref(true)
const currentUrl = ref('https://aucreno.com')

const withTransition = computed(() => {
  const path = router.currentRoute.value.path
  return allRoutes.includes(path)
})

function isRealMobile() {
  const isUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  /* decomment that line to test on desktop */
  return isUA
  // const isTouch = !!navigator.maxTouchPoints && navigator.maxTouchPoints > 1
  // const isSmallScreen = window.innerWidth <= 600
  // return isUA && isTouch && isSmallScreen
}

watch(
  () => router.currentRoute.value,
  (to, from) => {
    updateDirection(
      to ?? router.currentRoute.value,
      from ?? router.currentRoute.value
    )
    transitionName.value = direction.value === 'back' ? 'slide-back' : 'slide-forward'
  },
  { immediate: true }
)

onMounted(() => {
  isMobile.value = isRealMobile()

  const splash = document.getElementById('splash')
  if (splash) {
    setTimeout(() => splash.classList.add('hidden'), 1000) // délai pour l'effet de transition
  }

  // Optimisation PWA - empêche les reloads accidentels
  if (window.matchMedia('(display-mode: standalone)').matches) {
    // Désactive le pull-to-refresh
    document.body.style.overscrollBehavior = 'none'
    
    // Empêche les liens externes d'ouvrir dans la PWA
    document.addEventListener('click', (e) => {
      const link = (e.target as HTMLElement).closest('a')
      if (link && link.target === '_blank') {
        e.preventDefault()
        window.open(link.href, '_blank')
      }
    })
  }
})
</script>

<template>
  <IonApp>
    <template v-if="isMobile">
      <div class="relative min-h-screen">
        <NuxtPwaManifest />
        <NuxtLayout>
          <NuxtPage
            v-if="withTransition"
            :transition="{ name: transitionName, mode: 'default' }" />
          <NuxtPage v-else />
        </NuxtLayout>
      </div>
      <!-- <InstallPromptDialog /> -->
    </template>

    <template v-else>
      <div class="fixed inset-0 z-50 bg-white flex flex-col justify-center items-center">
        <div class="max-w-md text-center">
          <img
            src="https://res.cloudinary.com/augalo/image/upload/v1749743519/aucreno/aucreno_ugbklx.png"
            alt="Logo aucreno"
            class="w-24 mx-auto mb-8"
          >
          <p class="text-xl tracking-tight mb-4 text-gray-600 bg-gray-100 p-4">Accès mobile uniquement</p>
          <p class="text-gray-500">Scanne ce QR code avec ton téléphone :</p>
          <img
            v-if="currentUrl"
            :src="`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(currentUrl)}`"
            alt="QR code"
            class="mx-auto mt-2" >
        </div>
      </div>
    </template>
  </IonApp>
</template>
