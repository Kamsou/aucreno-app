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
    <IonContent :fullscreen="true">
      <main
        v-if="!auth.isAuthenticated"
        class="h-full w-full flex flex-col items-center justify-center px-4 pb-20">
        <img
          src="/public/icon-calender.png"
          alt="Icone Calendar"
          class="w-42 mx-auto mb-4">
        <img
          src="https://res.cloudinary.com/augalo/image/upload/v1749743519/aucreno/aucreno_ugbklx.png"
          alt="Logo aucreno"
          class="w-24 mx-auto mb-4"
        >
        <p class=" max-w-[250px] mx-auto font-medium text-center">
          Fini les carnets : l'app gère ta planif' et ton suivi client.</p>
        <div
          class="mt-4 w-[60vw]"
          @click="login"
        >
          <IonButton class="button-secondary w-full">
            C'est parti !
          </IonButton>
        </div>
      </main>

      <main
        v-if="auth.isAuthenticated"
        class="h-full w-full flex flex-col items-center justify-center px-4 pb-28">
        <p class="text-3xl font-bold tracking-tighter">Bienvenue sur Aucreno</p>
        <p class="text-sm text-gray-500 mt-2">Tu peux maintenant gérer tes rendez-vous et clients.</p>
        <div class="mt-4 w-[60vw]">
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
