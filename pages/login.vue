<script setup lang="ts">
const user = ref({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  cgv: false,
})

const router = useRouter()
const route = useRoute()
const supabase = useSupabaseClient()

const step = ref(1)

const title = computed(() => {
  switch (step.value) {
  case 1:
    return 'Connexion / Inscription'
  case 2:
    return 'Connexion'
  case 3:
    return "Terminer l'inscription"
  default:
    return ''
  }
})

async function checkEmail() {
  const { data } = await supabase
    .from('coaches')
    .select('id')
    .eq('email', user.value.email)
    .single()

  if (data) {
    step.value = 2 // Email existe, demander le mot de passe
  } else {
    step.value = 3 // Nouvel utilisateur, inscription
  }
}

function goBack() {
  if (step.value > 1) {
    step.value = 1
    return
  }

  if (step.value === 1 && route.path !== '/login') {
    router.push('/')
    return
  }

  router.back()
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
            class="w-1/4"
            @click="goBack"
          >
            <div class="w-10 h-10 border border-gray-100 rounded-xl flex justify-center items-center shadow">
              <IonIcon
                :icon="ioniconsArrowUndoOutline"
                class="text-gray-500 text-lg"
                :color="$route.path === '/login' ? 'dark' : 'light'"
              />
            </div>
          </div>

          <p class="w-2/4 text-sm font-bold text-center">{{ title }}</p>
          <div class="w-1/4" />
        </div>

        <div v-if="step === 1">
          <img
            src="https://res.cloudinary.com/augalo/image/upload/v1749744614/aucreno/calendar-without-aucreno_xx13ly.png"
            alt="Logo aucreno"
            class="w-24 mx-auto mb-8"
          >
          <p class="text-3xl font-bold tracking-tighter">On démarre</p>

          <AppInput 
            v-model="user.email"
            class="mt-4 mb-4"
            type="email"
            placeholder="Entre ton adresse e-mail"
          />

          <IonButton
            class="button-primary w-full"
            :disabled="!user.email"
            @click="checkEmail">
            Continuer
          </IonButton>
        </div>

        <div v-if="step === 2">
          <img
            src="https://res.cloudinary.com/augalo/image/upload/v1749744614/aucreno/calendar-without-aucreno_xx13ly.png"
            alt="Logo aucreno"
            class="w-24 mx-auto mb-8"
          >
          <p class="text-3xl font-bold tracking-tighter">Il est l'heure de coacher !</p>

          <AppInput 
            v-model="user.password"
            class="mt-2 mb-4"
            type="password"
            placeholder="Entre ton mot de passe"
          />

          <IonButton
            class="button-primary w-full"
            :disabled="!user.email"
            @click="login">
            Continuer
          </IonButton>
        </div>

        <div v-if="step === 3">
          <img
            src="https://res.cloudinary.com/augalo/image/upload/v1749744614/aucreno/calendar-without-aucreno_xx13ly.png"
            alt="Logo aucreno"
            class="w-24 mx-auto mb-8"
          >
          <p class="text-3xl font-bold tracking-tighter">Bienvenue Coach</p>

          <AppInput 
            v-model="user.firstName"
            class="mt-4 mb-4"
            type="text"
            placeholder="Entre ton prénom"
          />

          <AppInput 
            v-model="user.lastName"
            class="mt-4 mb-4"
            type="text"
            placeholder="Entre ton nom"
          />

          <AppInput 
            v-model="user.email"
            class="mt-4 mb-4"
            type="email"
            placeholder="Entre ton adresse e-mail"
          />

          <AppInput 
            v-model="user.password"
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
            :disabled="!user.firstName || !user.lastName || !user.email || !user.password || !user.cgv"
            @click="login">
            Valider
          </IonButton>
        </div>
      </section>
    </IonContent>
  </IonPage>
</template>
