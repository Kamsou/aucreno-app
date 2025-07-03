<script setup lang="ts">
const router = useRouter()

const { direction, updateDirection } = usePageDirection()
const transitionName = ref('slide-forward')

const isMobile = ref(true)
const currentUrl = ref('https://aucreno.com')
const showSplash = ref(true)

const withTransition = computed(() => {
  const path = router.currentRoute.value.path
  // Only apply transition for login page
  return path === '/login'
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
    // Only update direction for login page transitions
    if (to?.path === '/login' || from?.path === '/login') {
      updateDirection(
        to ?? router.currentRoute.value,
        from ?? router.currentRoute.value
      )
      transitionName.value = direction.value === 'back' ? 'slide-back' : 'slide-forward'
    }
  },
  { immediate: true }
)

onMounted(() => {
  isMobile.value = isRealMobile()

  setTimeout(() => {
    showSplash.value = false
  }, 2000)

  if (window.matchMedia('(display-mode: standalone)').matches) {
    document.body.style.overscrollBehavior = 'none'
    
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
    <div
      v-if="showSplash"
      class="fixed inset-0 z-[10000] bg-white flex items-center justify-center splash-screen">
      <img
        src="https://res.cloudinary.com/augalo/image/upload/v1749743519/aucreno/aucreno_ugbklx.png"
        alt="Logo aucreno"
        class="w-32 h-32 object-contain splash-logo"
      >
    </div>

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
      <InstallPromptDialog />
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

<style>
.splash-screen {
  animation: splash-fade-out 2s ease-in-out forwards;
}

.splash-logo {
  animation: logo-lifecycle 2s ease-in-out;
}

@keyframes splash-fade-out {
  0% {
    opacity: 1;
  }
  85% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes logo-lifecycle {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  25% {
    opacity: 1;
    transform: scale(1.05);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
  75% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 0;
    transform: scale(0.8);
  }
}
</style>
