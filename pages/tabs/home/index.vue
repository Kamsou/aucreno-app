<script setup lang="ts">
definePageMeta({
  alias: ['/tabs', '/'],
})
useHead({
  title: 'Home',
})

const auth = useAuthStore()

function login() {
  useRouter().push('/login')
}
</script>

<template>
  <IonPage>
    <IonContent
      :fullscreen="true"
      class="bg-gradient-to-b from-white to-[#d1f3f7]">
      <main
        v-if="!auth.isAuthenticated"
        class="h-full w-full flex flex-col items-center justify-center px-4 pb-20">
        <img
          src="/public/icon-calender.png"
          alt="Icône calendrier"
          class="w-28 mx-auto mb-4 drop-shadow"
        >
        <img
          src="https://res.cloudinary.com/augalo/image/upload/v1749743519/aucreno/aucreno_ugbklx.png"
          alt="Logo aucreno"
          class="w-24 mx-auto mb-6"
        >
        <p class="max-w-[260px] mx-auto font-medium text-center text-gray-700 mb-6">
          Fini les carnets&nbsp;: l'app gère ta planif' et ton suivi client.
        </p>
        <div class="mt-2 w-full max-w-xs">
          <IonButton
            class="button-primary w-full"
            @click="login">
            C'est parti&nbsp;!
          </IonButton>
        </div>
      </main>

      <main
        v-else
        class="h-full w-full flex flex-col items-center justify-center px-4 pb-28">
        <img
          src="https://res.cloudinary.com/augalo/image/upload/v1749743519/aucreno/aucreno_ugbklx.png"
          alt="Logo aucreno"
          class="w-24 mx-auto mb-6"
        >
        <p class="max-w-[280px] mx-auto font-medium text-center text-gray-700 mb-6">
          Tu peux désormais gérer ton agenda, tes clients et ton profil.
        </p>
        <div class="mt-2 w-full max-w-xs">
          <IonButton
            class="button-primary w-full"
            @click="$router.push('/tabs/agenda')">
            Accéder à l'agenda
          </IonButton>
        </div>
      </main>
    </IonContent>
  </IonPage>
</template>
