<script setup lang="ts">
const name = ref('')
const email = ref('')
const password = ref('')

const router = useRouter()

const user = ref({
  name: '',
  email: '',
  password: '',
  cgv: false,
})

function goBack() {
  router.push('/')
}

function register() {
  router.push('/tabs/home')
}
</script>

<template>
  <IonPage>
    <IonContent :fullscreen="true">
      <section class="px-5 mt-4">
        <div class="flex justify-between items-center mb-4 w-full">
          <div
            class="w-1/2 "
            @click="goBack">
            <div class="w-10 h-10 border border-gray-100 rounded-xl flex justify-center items-center shadow">
              <IonIcon
                :icon="ioniconsArrowUndoOutline"
                class="text-gray-500 text-lg"
                :color="$route.path === '/register' ? 'dark' : 'light'"
              />
            </div>
          </div>
        </div>

        <div >
          <img
            src="https://res.cloudinary.com/augalo/image/upload/v1749744614/aucreno/calendar-without-aucreno_xx13ly.png"
            alt="Logo aucreno"
            class="w-24 mx-auto mb-8"
          >
        </div>
        <p class="text-4xl font-bold tracking-tighter">Bienvenue Coach !</p>
        <p class="text-xl font-medium mt-4">S’inscrire</p>
        <AppInput 
          v-model="name"
          class="mt-4 mb-4"
          type="name"
          placeholder="Prénom + Nom"
        />
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

        <div class="flex items-start gap-4 bg-white mb-4">
          <IonToggle
            color="dark"
            mode="ios"
            @ion-change="user.cgv = !user.cgv" />

          <div class="text-[14px] text-gray-400">
            J’accepte les
            <NuxtLink
              class="underline !text-gray-400"
              to="https://augalo.com/privacy/"
              target="_blank">Politique de confidentialité</NuxtLink> et
            <NuxtLink
              class="underline !text-gray-400"
              to="https://aucreno.com/legal/"
              target="_blank">
              Mentions légales
            </NuxtLink>
          </div>
        </div>

        <IonButton
          class="button-primary w-full"
          :disabled="!user.cgv"
          @click="register">
          S'inscrire
        </IonButton>
      </section>
    </IonContent>
  </IonPage>
</template>
