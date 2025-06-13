<script setup lang="ts">
const router = useRouter()
const { direction, updateDirection } = usePageDirection()
const transitionName = ref('slide-forward')

const isMobile = ref(true)
const currentUrl = ref('https://aucreno.com')

function isRealMobile() {
  const isUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  // const isTouch = !!navigator.maxTouchPoints && navigator.maxTouchPoints > 1
  // const isSmallScreen = window.innerWidth <= 600
  // return isUA && isTouch && isSmallScreen
  return isUA
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
})
</script>

<template>
  <IonApp>
    <template v-if="isMobile">
      <div class="relative min-h-screen overflow-hidden">
        <NuxtPage :transition="{ name: transitionName, mode: 'default' }" />
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
          <p class="text-xl tracking-tight mb-4 bg-gray-100 p-4">Accès mobile uniquement</p>
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
