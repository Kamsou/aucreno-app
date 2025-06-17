<script setup lang="ts">
useHead({
  title: 'Profil',
})

const auth = useAuthStore()
const supabase = useSupabaseClient()

function login() {
  useRouter().push('/login')
}

async function logout() {
  await supabase.auth.signOut()
  auth.isAuthenticated = false
  auth.user = null
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

      <div class="flex flex-col items-center justify-center min-h-[70vh] px-4">
        <template v-if="!auth.isAuthenticated">
          <img
            src="https://res.cloudinary.com/augalo/image/upload/v1749744614/aucreno/calendar-without-aucreno_xx13ly.png"
            alt="Logo"
            class="w-20 mb-6"
          >
          <p class="text-2xl font-bold text-gray-800 mb-2">Bienvenue !</p>
          <p class="text-gray-500 mb-6 text-center">Connecte-toi ou crée un compte pour accéder à ton espace coach.</p>
          <IonButton
            class="button-primary w-full max-w-xs"
            @click="login">
            Connexion ou inscription
          </IonButton>
        </template>

        <template v-else>
          <img
            src="https://res.cloudinary.com/augalo/image/upload/v1749744614/aucreno/calendar-without-aucreno_xx13ly.png"
            alt="Profil"
            class="w-20 mb-6"
          >
          <p class="text-3xl font-bold tracking-tighter mb-2">Bienvenue sur Aucreno</p>
          <p class="text-base text-gray-500 mb-6 text-center">Gère ton profil 
            et tes rendez-vous  simplicité.</p>
          <div class="flex flex-col gap-2 items-center w-full max-w-xs">
            <IonButton
              class="button-secondary w-full"
              fill="outline"
              color="medium"
              @click="logout"
            >
              Se déconnecter
            </IonButton>
          </div>
        </template>
      </div>
    </IonContent>
  </IonPage>
</template>
