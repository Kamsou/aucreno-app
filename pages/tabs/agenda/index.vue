<script setup lang="ts">
useHead({
  title: 'Agenda',
})

const auth = useAuthStore()
const selectedDate = ref<string | null>(null)

// Initialiser avec la date d'aujourd'hui
onMounted(() => {
  const today = new Date()
  selectedDate.value = today.toISOString()
})

function login() {
  useRouter().push('/login')
}

function onDateChange(event: CustomEvent) {
  selectedDate.value = event.detail.value
}

function formatSelectedDate(dateString: string) {
  const selectedDateObj = new Date(dateString)
  const today = new Date()
  
  // Comparer uniquement les dates (jour, mois, année) sans l'heure
  const isToday = selectedDateObj.toDateString() === today.toDateString()
  
  if (isToday) {
    return 'Aujourd\'hui'
  }
  
  return selectedDateObj.toLocaleDateString('fr-FR', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  })
}
</script>

<template>
  <IonPage>
    <IonHeader :translucent="true">
      <IonToolbar>
        <IonTitle>Agenda</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent :fullscreen="true">
      <IonHeader collapse="condense">
        <IonToolbar>
          <p class="px-3 text-2xl font-bold">Agenda</p>
        </IonToolbar>
      </IonHeader>

      <div class="mt-2 p-4">
        <IonDatetime
          presentation="date"
          locale="fr-FR"
          class="w-full"
          :value="selectedDate"
          @ion-change="onDateChange"
        />
      </div>

      <div
        v-if="selectedDate"
        class="px-4 mt-2"
      >
        <p class="text-md font-bold capitalize">
          {{ formatSelectedDate(selectedDate) }}
        </p>
      </div>

      <div 
        class="px-2 mt-2 transition-opacity duration-500 relative"
        :class="{ 'opacity-30': !auth.isAuthenticated, 'opacity-100': auth.isAuthenticated }">
        <UserListSkeleton :count="1" />
      </div>

      <main
        v-if="!auth.isAuthenticated"
        class="absolute bottom-12 left-0 right-0 w-full h-[25vh] flex flex-col 
        items-center justify-center px-6 pb-20 pt-8"
        style="background: linear-gradient(to top, white, white, transparent)"
      >
        <div 
          class="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 w-full max-w-sm mx-auto">
          <p class="text-sm font-bold text-gray-800 text-center mb-2">
            Connecte-toi pour consulter tes créneaux
          </p>

          <p class="text-xs text-gray-600 text-center mb-6">
            Tu pourras ainsi gérer tes rendez-vous et consulter tes créneaux disponibles
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

      <main
        v-if="auth.isAuthenticated"
        class="h-full w-full flex flex-col items-center justify-center px-4 pb-28">
        <p class="text-3xl font-bold tracking-tighter">Bienvenue sur Aucreno</p>
        <p class="text-sm text-gray-500 mt-2">Tu peux maintenant gérer tes rendez-vous.</p>
      </main>
    </IonContent>
  </IonPage>
</template>
