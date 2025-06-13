<script setup lang="ts">
const router = useRouter()
function goToRegister() {
  router.push('/register')
}
function goToLogin() {
  router.push('/login')
}
</script>

<template>
  <IonPage>
    <IonContent :fullscreen="true">
      <div class="flex flex-col min-h-screen">
        <section class="flex-1 flex flex-col justify-center mt-8 px-4 pb-32 text-center">
          <img
            src="https://res.cloudinary.com/augalo/image/upload/v1749744614/aucreno/calendar-without-aucreno_xx13ly.png"
            alt="Logo aucreno"
            class="w-24 mx-auto mb-8"
          >
          <img
            src="https://res.cloudinary.com/augalo/image/upload/v1749743519/aucreno/aucreno_ugbklx.png"
            alt="Logo aucreno"
            class="w-32 mx-auto mb-8"
          >
          <p class=" max-w-[280px] mx-auto font-medium"> 
            Fini les carnets : l'app gère la planif' et le suivi client. Tout à portée de main.
          </p>
        </section>

        <div class="fixed bottom-4 left-0 right-0 z-50 bg-white pb-safe px-4 pt-4">
          <div class="flex flex-col gap-4">
            <IonButton
              class="button-primary w-full"
              @click="goToRegister">
              Commencer
            </IonButton>
            <IonButton
              class="button-secondary w-full"
              @click="goToLogin">
              J'ai déjà un compte
            </IonButton>
          </div>
        </div>
      </div>
    </IonContent>
  </IonPage>
</template>
