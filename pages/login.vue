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
  const { error } = await supabase.auth.signInWithOtp({
    email: user.value.email,
  })
  if (error) {
    alert(error.message)
    return
  }
  step.value = 2 // Passe à l'étape OTP
}

async function verifyOtp() {
  otpError.value = ''
  const {  error } = await supabase.auth.verifyOtp({
    email: user.value.email,
    token: otp.value,
    type: 'email'
  })
  if (error) {
    otpError.value = error.message
    return
  }
  // Passe à l'étape création du profil/mot de passe
  step.value = 3
}

async function completeProfile() {
  // Met à jour le mot de passe de l'utilisateur connecté
  const { error } = await supabase.auth.updateUser({
    password: user.value.password,
    data: {
      first_name: user.value.first_name,
      last_name: user.value.last_name,
    }
  })
  if (error) {
    alert(error.message)
    return
  }

  // Récupère l'utilisateur courant
  const { data: currentUser } = await supabase.auth.getUser()
  const userId = currentUser?.user?.id

  // Ajoute dans la table coaches
  await supabase.from('coaches').insert([{
    user_id: userId,
    email: user.value.email,
    first_name: user.value.first_name,
    last_name: user.value.last_name,
    cgv: user.value.cgv,
  }])

  router.push('/tabs/home')
}

watch(step, (newStep, oldStep) => {
  prevStep.value = oldStep
  transitionName.value = newStep > oldStep ? 'slide-over-forward' : 'slide-over-back'
})
</script>

<template>
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
              <!-- Step 1 : Email -->
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
                  :disabled="!user.email"
                  @click="sendOtp">
                  Continuer
                </IonButton>
              </div>

              <!-- Step 2 : OTP -->
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
                  :disabled="!otp"
                  @click="verifyOtp">
                  Vérifier
                </IonButton>
                <p
                  v-if="otpError"
                  class="text-red-500 mt-2">{{ otpError }}</p>
              </div>

              <!-- Step 3 : Profil et mot de passe -->
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
                <AppInput 
                  v-model="user.password"
                  class="mt-2 mb-4"
                  type="password"
                  placeholder="Crée ton mot de passe"
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
                  :disabled="!user.first_name || !user.last_name || !user.password || !user.cgv"
                  @click="completeProfile">
                  Valider
                </IonButton>
              </div>
            </div>
          </Transition>
        </div>
      </section>
    </IonContent>
  </IonPage>
</template>
