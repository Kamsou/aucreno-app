<script setup lang="ts">

const isMobile = ref(true)
const currentUrl = ref('https://aucreno.com')

function isRealMobile() {
  const isUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  // const isTouch = !!navigator.maxTouchPoints && navigator.maxTouchPoints > 1
  // const isSmallScreen = window.innerWidth <= 600
  // return isUA && isTouch && isSmallScreen
  return isUA
}

onMounted(() => {
  isMobile.value = isRealMobile()
})
</script>

<template>
  <IonApp>
    <template v-if="isMobile">
      <IonRouterOutlet />
      <!-- <InstallPrompt /> -->
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
