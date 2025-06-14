<script setup lang="ts">
const email = ref('')
const password = ref('')

const router = useRouter()

function goBack() {
  router.push('/')
}

function login() {
  router.push('/tabs/home')
}
</script>

<template>
  <IonPage>
    <IonContent :fullscreen="true">
      <section class="px-4 mt-4">
        <div class="flex justify-between items-center mb-4 w-full">
          <div
            class="w-1/2 "
            @click="goBack">
            <div class="w-10 h-10 border border-gray-100 rounded-xl flex justify-center items-center shadow">
              <IonIcon
                :icon="ioniconsArrowUndoOutline"
                class="text-gray-500 text-lg"
                :color="$route.path === '/login' ? 'dark' : 'light'"
              />
            </div>
          </div>
        </div>

        <img
          src="https://res.cloudinary.com/augalo/image/upload/v1749744614/aucreno/calendar-without-aucreno_xx13ly.png"
          alt="Logo aucreno"
          class="w-24 mx-auto mb-8"
        >
        <p class="text-4xl font-bold tracking-tighter">Il est l'heure de coacher !</p>
        <p class="text-xl font-medium mt-4">Se connecter</p>

        <AppInput 
          v-model="email"
          class="mt-4 mb-4"
          type="email"
          placeholder="Entre ton email"
        />
        <AppInput 
          v-model="password"
          class="mt-2 mb-4"
          type="password"
          placeholder="Entre ton mot de passe"
        />

        <IonButton
          class="button-primary w-full"
          @click="login">
          Se connecter
        </IonButton>
      </section>
    </IonContent>
  </IonPage>
</template>
