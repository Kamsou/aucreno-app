<script setup lang="ts">
defineProps<{ error: { statusCode?: number, message?: string } }>()
</script>

<template>
  <IonPage>
    <IonContent class="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-white to-[#d1f3f7]">
      <div
        class="flex flex-col items-center justify-center text-center px-6 py-10 
      rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm max-w-md mx-auto h-full">
        <img
          src="https://res.cloudinary.com/augalo/image/upload/v1749744614/aucreno/calendar-without-aucreno_xx13ly.png"
          alt="Erreur"
          class="w-24 mb-2 drop-shadow-lg"
        >
        <p class="text-xl font-extrabold text-gray-800 mb-2 tracking-tight">Oups…</p>
        <p class="text-xl font-semibold text-gray-500 mb-2">
          Erreur {{ error.statusCode || 500 }}
        </p>
        <p class="text-base text-gray-600 mb-8 max-w-xs mx-auto leading-relaxed">
          Petite pause pour le coach sportif.<br>
          {{ error.message || 'Réessaie dans un instant.' }}
        </p>
        <IonButton
          class="button-primary px-8 py-2 rounded-xl text-base font-medium shadow"
          @click="$router.push('/')">
          Retour 
        </IonButton>
      </div>
    </IonContent>
  </IonPage>
</template>
