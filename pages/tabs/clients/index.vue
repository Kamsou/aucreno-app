<script setup lang="ts">
useHead({
  title: 'Clients',
})

const auth = useAuthStore()

function login() {
  useRouter().push('/login')
}
</script>

<template>
  <IonPage>
    <IonHeader :translucent="true">
      <IonToolbar>
        <IonTitle>Clients</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent :fullscreen="true">
      <IonHeader collapse="condense">
        <IonToolbar>
          <p class="px-3 text-2xl font-bold">Clients</p>
        </IonToolbar>
      </IonHeader>

      <main
        v-if="!auth.isAuthenticated"
        class="px-4 mt-4">
        <p class="text-md font-bold">Connectes-toi pour voir ta liste de clients</p>

        <p class="text-sm">
          Tu peux créer, consulter et modifier tes clients en te connectant à votre compte
        </p>

        <div
          class="mt-8"
          @click="login"
        >
          <IonButton class="button-primary w-full">
            Connexion
          </IonButton>
        </div>
      </main>

      <main
        v-if="auth.isAuthenticated"
        class="h-full w-full flex flex-col items-center justify-center px-4 pb-28">
        <p class="text-3xl font-bold tracking-tighter">Bienvenue sur Aucreno</p>
        <p class="text-sm text-gray-500 mt-2">Tu peux maintenant gérer tes clients.</p>
      </main>
    </IonContent>
  </IonPage>
</template>
