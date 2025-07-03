<script setup lang="ts">
import { IonButton } from "@ionic/vue"

const show = ref(false)
const browserType = ref<'safari' | 'chrome' | 'other'>('other')

interface NavigatorWithStandalone extends Navigator {
  standalone?: boolean;
}

function isStandalone() {
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return true
  }

  if ((window.navigator as NavigatorWithStandalone).standalone) {
    return true
  }
  return false
}

function detectBrowser() {
  const userAgent = navigator.userAgent.toLowerCase()

  
  if (/chrome/.test(userAgent) && !/edg/.test(userAgent) && !/opr/.test(userAgent)) {
    return 'chrome'
  }
  
  if (/safari/.test(userAgent) && !/chrome/.test(userAgent)) {
    return 'safari'
  }
  
  if (/iphone|ipad|ipod/.test(userAgent) && /safari/.test(userAgent) && !/chrome/.test(userAgent)) {
    return 'safari'
  }
  

  return 'other'
}

onMounted(() => {
  if (isStandalone()) {
    return
  }
  
  browserType.value = detectBrowser()
  show.value = true
})

function close() {
  show.value = false
}
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 bg-black/60 flex justify-center items-center p-4">
    <div class="w-full max-w-md bg-white h-full">
      <div class="p-6 border-b border-gray-200">
        <div class="flex items-center justify-center mb-4">
          <img
            src="/icon-192.png"
            alt="Icône Aucreno"
            class="w-16 h-16" >
        </div>
        <h2 class="text-xl font-bold text-center text-gray-900 mb-2">Installer Aucreno</h2>
        <p class="text-center text-gray-600 text-sm">
          Ajoutez l'app à votre écran d'accueil
        </p>
      </div>

      <div class="p-6">
        <div
          v-if="browserType === 'safari'"
          class="space-y-4">
          <div class="text-center mb-6">
            <span class="inline-flex items-center text-gray-700 text-sm font-medium">
              <Icon
                name="fa-brands:safari"
                class="mr-2" />
              Safari
            </span>
          </div>
          
          <div class="space-y-3">
            <div class="flex items-start gap-4 p-3 border border-gray-200 rounded-lg">
              <div
                class="w-8 h-8 border-2 border-gray-600 rounded-full flex 
              items-center justify-center text-gray-600 font-bold text-sm">
                1
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <Icon
                    name="ion:share-outline"
                    class="text-gray-700" />
                  <p class="font-medium text-gray-900">Appuyez sur Partager</p>
                </div>
                <p class="text-gray-600 text-xs">
                  Icône en bas de Safari
                </p>
              </div>
            </div>

            <div class="flex items-start gap-4 p-3 border border-gray-200 rounded-lg">
              <div
                class="w-8 h-8 border-2 border-gray-600 rounded-full flex
              items-center justify-center text-gray-600 font-bold text-sm">
                2
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <Icon
                    name="ion:add"
                    class="text-gray-700" />
                  <p class="font-medium text-gray-900">Sur l'écran d'accueil</p>
                </div>
                <p class="text-gray-600 text-xs">
                  Dans le menu de partage
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="browserType === 'chrome'"
          class="space-y-4">
          <div class="text-center mb-6">
            <span class="inline-flex items-center text-gray-700 text-sm font-medium">
              <Icon
                name="fa-brands:chrome"
                class="mr-2" />
              Chrome
            </span>
          </div>
          
          <div class="space-y-3">
            <div class="flex items-start gap-4 p-3 border border-gray-200 rounded-lg">
              <div
                class="w-8 h-8 border-2 border-gray-900 rounded-full 
              flex items-center justify-center text-gray-900 font-bold text-sm">
                1
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <Icon
                    name="material-symbols:more-vert"
                    class="text-gray-700" />
                  <p class="font-medium text-gray-900">Appuyez sur Partager</p>
                </div>
                <p class="text-gray-600 text-xs">
                  En haut à droite de Chrome
                </p>
              </div>
            </div>

            <div class="flex items-start gap-4 p-3 border border-gray-200 rounded-lg">
              <div
                class="w-8 h-8 border-2 border-gray-900 rounded-full flex 
              items-center justify-center text-gray-900 font-bold text-sm">
                2
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <Icon
                    name="ion:add"
                    class="text-gray-700" />
                  <p class="font-medium text-gray-900">Ajouter à l'écran d'accueil</p>
                </div>
                <p class="text-gray-600 text-xs">
                  Dans le menu
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="browserType === 'other'"
          class="space-y-4">
          <div class="text-center mb-6">
            <span class="inline-flex items-center text-gray-700 text-sm font-medium">
              <Icon
                name="material-symbols:web"
                class="mr-2" />
              Autre navigateur
            </span>
          </div>
          
          <div class="border border-gray-200 rounded-lg p-4 mb-4">
            <div class="flex items-start gap-3">
              <Icon
                name="material-symbols:info"
                class="text-gray-600 mt-0.5" />
              <div>
                <h3 class="font-medium text-gray-900 mb-1">Instructions générales</h3>
                <p class="text-gray-600 text-sm">
                  Recherchez "Ajouter à l'écran d'accueil" dans le menu de votre navigateur
                </p>
              </div>
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
              <Icon
                name="fa-brands:safari"
                class="text-gray-600" />
              <div>
                <div class="font-medium text-sm text-gray-900">Safari</div>
                <div class="text-gray-500 text-xs">Partage → Sur l'écran d'accueil</div>
              </div>
            </div>
            
            <div class="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
              <Icon
                name="fa-brands:chrome"
                class="text-gray-600" />
              <div>
                <div class="font-medium text-sm text-gray-900">Chrome</div>
                <div class="text-gray-500 text-xs">Menu (⋮) → Ajouter à l'écran d'accueil</div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 pt-4 border-t border-gray-200">
          <IonButton
            class="button-primary w-full normal-case"
            @click="close"
          >
            J'ai compris
          </IonButton>
        </div>
      </div>
    </div>
  </div>
</template>
