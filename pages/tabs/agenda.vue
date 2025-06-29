<script setup lang="ts">
useHead({
  title: 'Aucreno - Agenda',
})
definePageMeta({
  layout: 'tabs'
})

const auth = useAuthStore()
const selectedDate = ref<string | null>(null)

interface Appointment {
  id: string
  startTime: string
  endTime: string
  clientName: string
  type: string
  status: 'confirmed' | 'pending' | 'cancelled'
}

const appointments: Appointment[] = [
  {
    id: '1',
    startTime: '14:00',
    endTime: '15:00',
    clientName: 'Marie Jolie',
    type: 'Séance coaching',
    status: 'confirmed'
  },
  {
    id: '2',
    startTime: '16:30',
    endTime: '17:30',
    clientName: 'Pierre Dupont',
    type: 'Suivi personnel',
    status: 'confirmed'
  }
]

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

function handleAppointmentClick(appointment: Appointment) {
  console.log('Rendez-vous cliqué:', appointment)
  // Ici vous pouvez naviguer vers la page de détail du rendez-vous
  // useRouter().push(`/tabs/agenda/${appointment.id}`)
}
</script>

<template>
  <IonPage>
    <IonHeader
      :translucent="true">
      <IonToolbar>
        <IonTitle>Agenda</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent :fullscreen="true">
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

      <!-- Section des rendez-vous ou bloc de connexion -->
      <div 
        v-if="auth.isAuthenticated" 
        class="space-y-3 px-4 mt-4 mb-24">
        <AppointmentCard
          v-for="appointment in appointments"
          :key="appointment.id"
          :appointment="appointment"
          @click="handleAppointmentClick"
        />
      </div>

      <!-- Skeleton pour donner un aperçu (visible en arrière-plan) -->
      <div 
        v-if="auth.isAuthenticated"
        class="px-4 mt-4 opacity-20">
        <UserListSkeleton :count="2" />
      </div>

      <!-- Overlay avec flou sur toute la page (sauf bloc de connexion) -->
      <div 
        v-if="!auth.isAuthenticated"
        class="absolute inset-0 bg-white/30 backdrop-blur-xs z-5"/>

      <main
        v-if="!auth.isAuthenticated"
        class="absolute bottom-32 left-0 right-0 w-full h-[25vh] flex 
        flex-col items-center justify-center px-4 pb-20 pt-8 bg-gradient-to-t 
        from-white via-white to-transparent z-10">
        <div
          class="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border 
        border-gray-100 w-full max-w-sm mx-auto">
          <p class="text-sm font-bold text-gray-800 text-center mb-2">
            Connecte-toi pour voir ton agenda
          </p>

          <p class="text-xs text-gray-600 text-center mb-4">
            Tu peux créer, consulter et modifier tes rendez-vous en te connectant à ton compte
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
