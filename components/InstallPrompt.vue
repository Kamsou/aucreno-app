<script setup lang="ts">
import { ref, onMounted } from 'vue'

const show = ref(false)

function isStandalone() {
  // Chrome/Android
  if (window.matchMedia('(display-mode: standalone)').matches) return true
  // iOS/Safari
  // @ts-ignore
  if (window.navigator.standalone) return true
  return false
}

onMounted(() => {
  // Si déjà vu ou déjà installé, ne pas afficher
  if (localStorage.getItem('pwa-install-shown') === 'yes') return
  if (isStandalone()) return
  show.value = true
})

function close() {
  show.value = false
  localStorage.setItem('pwa-install-shown', 'yes')
}
</script>

<template>
  <div v-if="show" class="fixed inset-0 z-50 bg-white flex justify-center items-center">
    <div class="w-[90vw] max-w-md">
      <button class="absolute left-4 top-4 text-gray-400" @click="close">
        <Icon
          name="entypo:cross"
          class="text-gray-800 text-2xl" />
      </button>
      <p class="text-lg font-bold mb-2 text-center">Ajouter Aucreno sur ton tél.</p>
      <div class="flex justify-center items-center flex-row-reverse gap-4">
        <p class="mb-4 text-sm text-gray-600">
          Pour un accès rapide, ajoute cette application à ton écran d'accueil. Suivez les étapes ci-dessous pour votre appareil.
        </p>
        <!-- Illustration -->
        <img src="/icon-192.png" alt="Icône" class="w-24 h-24 mx-auto mb-4" />
      </div>
      <!-- Instructions iOS -->
      <div class="mb-3">
        <div class="font-semibold">iOS</div>
        <div class="">
          <div class="flex items-center gap-4 mb-2">
            <div class="bg-gray-100 rounded-lg p-3 flex items-center justify-center">
              <Icon
                name="fa-brands:safari"
                class="text-gray-800 text-2xl" />
            </div>
            <div>
              <p><span class="text-xs">1.</span> Ouvrir dans Safari</p>
              <p class="text-gray-400 text-sm pb-1">Appuyez sur l'icône de partage en bas de l'écran.</p>
            </div>
          </div>
          </div>
          <div class="flex items-center gap-4">
            <div class="bg-gray-100 rounded-lg p-3 flex items-center justify-center">
              <Icon
                name="fe:plus"
                class="text-gray-800 text-2xl" />
            </div>
              <div>
                <p><span class="text-xs">2.</span> Ajouter à l'écran d'accueil</p>
                <p class="text-gray-400 text-sm pb-1">Sélectionnez « Ajouter à l'écran d'accueil » dans le menu.</p>
          </div>
        </div>
      </div>
      <!-- Instructions Android -->
      <div class="mb-3">
        <div class="font-semibold">Android</div>
          <div class="flex items-center gap-4 mb-2">
            <div class="bg-gray-100 rounded-lg p-3 flex items-center justify-center">
              <Icon
                name="fa-brands:chrome"
                class="text-gray-800 text-2xl" />
            </div>
              <div>
                <p><span class="text-xs">1.</span> Ouvrir dans Chrome</p>
                <p class="text-gray-400 text-sm pb-1">Appuyez sur les trois points dans le coin supérieur droit.</p>
              </div>
          </div>
          <div class="flex items-center gap-4">
            <div class="bg-gray-100 rounded-lg p-3 flex items-center justify-center">
              <Icon
                name="fe:plus"
                class="text-gray-800 text-2xl" />
              </div>
              <div>
                <p><span class="text-xs">2.</span> Ajouter à l'écran d'accueil</p>
                <p class="text-gray-400 text-sm pb-1">Sélectionnez « Ajouter à l'écran d'accueil » dans le menu.</p>
          </div>
        </div>
      </div>
      <button
        @click="close"
        class="w-full mt-4 bg-black text-white p-3 font-semibold h-12"
      >
      C’est fait !
    </button>
    </div>
  </div>
</template>

