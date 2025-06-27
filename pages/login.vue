<script setup lang="ts">
import type { Database } from '~/types/supabase.types'

const user = ref({
  email: '',
  password: '',
  first_name: '',
  last_name: '',
  cgv: false,
})

const router = useRouter()
const route = useRoute()
const supabase = useSupabaseClient<Database>()

const step = ref(1)
const prevStep = ref(1)
const transitionName = ref('slide-left')

const otp = ref('')
const otpError = ref('')

const isLoadingOtp = ref(false)
const isLoadingVerify = ref(false)
const isLoadingProfile = ref(false)

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

async function sendOtp() {
  isLoadingOtp.value = true
  const { error } = await supabase.auth.signInWithOtp({
    email: user.value.email,
  })
  isLoadingOtp.value = false
  if (error) {
    // Si erreur 400 ou autre erreur, rediriger vers l'inscription
    console.log('Erreur OTP:', error)
    step.value = 3
    return
  }
  step.value = 2
}

async function verifyOtp() {
  isLoadingVerify.value = true
  otpError.value = ''
  const { error } = await supabase.auth.verifyOtp({
    email: user.value.email,
    token: otp.value,
    type: 'email'
  })
  if (error) {
    otpError.value = error.message
    isLoadingVerify.value = false
    return
  }

  // Si la vérification OTP est réussie, rediriger directement vers l'accueil
  isLoadingVerify.value = false
  router.push('/')
}

async function completeProfile() {
  isLoadingProfile.value = true
  
  const { data: currentUser } = await supabase.auth.getUser()
  const userId = currentUser?.user?.id

  if (!userId) {
    alert("Erreur d'authentification")
    isLoadingProfile.value = false
    return
  }

  const { error } = await supabase.from('coaches').insert([{
    user_id: userId,
    email: user.value.email,
    first_name: user.value.first_name,
    last_name: user.value.last_name,
    cgv: user.value.cgv,
  }])

  if (error) {
    alert(error.message)
    isLoadingProfile.value = false
    return
  }

  isLoadingProfile.value = false
  router.push('/')
}

watch(step, (newStep, oldStep) => {
  prevStep.value = oldStep
  transitionName.value = newStep > oldStep ? 'slide-over-forward' : 'slide-over-back'
})


const auth = useAuthStore()
const loading = ref(true)

onMounted(async () => {
  await auth.fetchUser()
  if (auth.isAuthenticated) {
    router.push('/')
  } else {
    loading.value = false
  }
})
</script>

<template>
  <div
    v-if="loading"
    class="w-full h-screen flex items-center justify-center">
    <span>Chargement...</span>
  </div>
  <div v-else>
    <IonPage>
      <IonContent :fullscreen="true">
        <section class="px-4 mt-4">
          <div class="flex justify-between items-center mb-4 w-full">
            <div
              class="w-1/4"
              @click="goBack">
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

          <div class="relative">
            <Transition :name="transitionName">
              <div :key="step">
                <div v-if="step === 1">
                  <img
                    src="https://res.cloudinary.com/augalo/image/upload/v1749744614/aucreno/calendar-without-aucreno_xx13ly.png"
                    alt="Logo aucreno"
                    class="w-24 mx-auto mb-8" >
                  <p class="text-3xl font-bold tracking-tighter">On démarre</p>
                  <AppInput 
                    v-model="user.email"
                    class="mt-4 mb-4"
                    type="email"
                    placeholder="Entre ton adresse e-mail"
                  />
                  <IonButton
                    class="button-primary w-full"
                    :disabled="!user.email || isLoadingOtp"
                    @click="sendOtp">
                    <span v-if="isLoadingOtp">Envoi...</span>
                    <span v-else>Continuer</span>
                  </IonButton>
                </div>

                <div v-else-if="step === 2">
                  <img
                    src="https://res.cloudinary.com/augalo/image/upload/v1749744614/aucreno/calendar-without-aucreno_xx13ly.png"
                    alt="Logo aucreno"
                    class="w-24 mx-auto mb-8" >
                  <p class="text-3xl font-bold tracking-tighter">Vérifie ton email</p>
                  <p class="mb-4 text-gray-500">Un code vient d’être envoyé à {{ user.email }}</p>
                  <AppInput
                    v-model="otp"
                    class="mb-4"
                    type="text"
                    placeholder="Code reçu par email"
                  />
                  <IonButton
                    class="button-primary w-full"
                    :disabled="!otp || isLoadingVerify"
                    @click="verifyOtp">
                    <span v-if="isLoadingVerify">Vérification...</span>
                    <span v-else>Vérifier</span>
                  </IonButton>
                  <p
                    v-if="otpError"
                    class="text-red-500 mt-2">{{ otpError }}</p>
                </div>

                <div v-else-if="step === 3">
                  <img
                    src="https://res.cloudinary.com/augalo/image/upload/v1749744614/aucreno/calendar-without-aucreno_xx13ly.png"
                    alt="Logo aucreno"
                    class="w-24 mx-auto mb-8" >
                  <p class="text-3xl font-bold tracking-tighter">Bienvenue Coach</p>
                  <AppInput 
                    v-model="user.first_name"
                    class="mt-4 mb-4"
                    type="text"
                    placeholder="Entre ton prénom"
                  />
                  <AppInput 
                    v-model="user.last_name"
                    class="mt-4 mb-4"
                    type="text"
                    placeholder="Entre ton nom"
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
                    :disabled="!user.first_name || !user.last_name || !user.cgv || isLoadingProfile"
                    @click="completeProfile">
                    <span v-if="isLoadingProfile">Création...</span>
                    <span v-else>Valider</span>
                  </IonButton>
                </div>
              </div>
            </Transition>
          </div>
        </section>
      </IonContent>
    </IonPage>
  </div>
</template>
