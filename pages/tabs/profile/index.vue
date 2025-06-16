<script setup lang="ts">
useHead({
  title: 'Profil',
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
        <IonTitle>Profile</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent :fullscreen="true">
      <IonHeader collapse="condense">
        <IonToolbar>
          <p class="px-3 text-2xl font-bold">Profil</p>
        </IonToolbar>
      </IonHeader>

      <main
        v-if="!auth.isAuthenticated"
        class="px-4 mt-4">
        <div
          @click="login"
        >
          <IonButton class="button-primary w-full">
            Connexion ou inscription
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
