<script setup lang="ts">
useHead({
  title: 'Aucreno - Profil',
})
definePageMeta({
  layout: 'tabs'
})

const auth = useAuthStore()
const supabase = useSupabaseClient()
const { isPWA } = usePWADetection()

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
    <IonContent :fullscreen="true">
      <IonHeader collapse="condense">
        <IonToolbar>
          <p
            class="px-3 text-2xl font-bold"
            :class="isPWA ? 'mt-0' : 'mt-4'"
          >
            Profil
          </p>
        </IonToolbar>
      </IonHeader>

      <div class="flex flex-col items-center justify-center min-h-[70vh] px-4">
        <template v-if="!auth.isAuthenticated">
          <img
            src="https://res.cloudinary.com/augalo/image/upload/v1749744614/aucreno/calendar-without-aucreno_xx13ly.png"
            alt="Logo"
            class="w-20 mb-6"
          >
          <img
            src="https://res.cloudinary.com/augalo/image/upload/v1749743519/aucreno/aucreno_ugbklx.png"
            alt="Logo aucreno"
            class="w-24 mx-auto mb-6"
          >
          <p class="text-gray-500 mb-6 text-center text-sm max-w-[80%]">
            Connecte-toi ou crée un compte pour accéder à ton espace coach.</p>
          <IonButton
            class="button-primary w-full max-w-xs"
            @click="login">
            Démarrer
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
