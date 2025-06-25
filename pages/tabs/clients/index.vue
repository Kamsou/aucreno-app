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
    <IonContent
      :fullscreen="true"
      class="relative">
      <IonHeader collapse="condense">
        <IonToolbar>
          <p class="px-3 text-2xl font-bold">Clients</p>
        </IonToolbar>
      </IonHeader>

      <div 
        class="transition-opacity duration-500"
        :class="{ 'opacity-30': !auth.isAuthenticated, 'opacity-100': auth.isAuthenticated }">
        <UserListSkeleton :count="4" />
      </div>

      <main
        v-if="!auth.isAuthenticated"
        class="absolute bottom-32 left-0 right-0 w-full h-[25vh] flex 
        flex-col items-center justify-center px-4 pb-20 pt-8 bg-gradient-to-t 
        from-white via-white to-transparent">
        <div
          class="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border 
        border-gray-100 w-full max-w-sm mx-auto">
          <p class="text-sm font-bold text-gray-800 text-center mb-2">
            Connecte-toi pour voir ta liste de clients
          </p>

          <p class="text-xs text-gray-600 text-center mb-4">
            Tu peux créer, consulter et modifier tes clients en te connectant à ton compte
          </p>

          <div @click="login">
            <IonButton 
              class="button-primary w-full" 
              expand="block"
              shape="round">
              Connexion
            </IonButton>
          </div>
        </div>
      </main>

    </IonContent>
  </IonPage>
</template>

<style scoped>
  ion-skeleton-text {
    --border-radius: 9999px;
    --background: rgba(188, 0, 255, 0.065);
    --background-rgb: 188, 0, 255;
  }
</style>
