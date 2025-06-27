<script setup lang="ts">
import {
  homeOutline as ioniconsHomeOutline,
  calendarOutline as ioniconsCalendarOutline,
  peopleOutline as ioniconsPeopleOutline,
  personOutline as ioniconsPersonOutline
} from 'ionicons/icons'




onMounted(() => {
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches
  
  // En mode Safari web, ajuster uniquement la position de la tab bar
  if (isSafari && !isStandalone) {
    const tabBar = document.querySelector('.tab-bar-safari') as HTMLElement
    if (tabBar) {
      tabBar.style.bottom = '85px' // Au-dessus de la barre Safari
    }
  }
  // Plus de logique de masquage des barres - on laisse Safari gérer naturellement
})
</script>

<template>
  <IonPage>
    <IonContent>
      <NuxtPage />
      <nav
        class="fixed left-0 right-0 bg-white border-t
         border-gray-200 flex justify-around items-center z-[9999] tab-bar-safari"
        style="bottom: env(safe-area-inset-bottom, 0px);
               height: 4rem; 
               margin-bottom: 0px;">
        <button
          class="flex flex-col items-center text-xs transition py-2"
          @click="navigateTo('/')"
        >
          <IonIcon
            :icon="ioniconsHomeOutline"
            class="text-xl mb-1"
            :color="$route.path === '/tabs/home' || $route.path === '/tabs' || $route.path === '/' ? 'dark' : 'light'"
          />
          <span
            class=" text-[10px]"
            :class="$route.path === '/tabs/home' || $route.path === '/tabs' || $route.path === '/' ? 
              'text-gray-800' : 'text-gray-300'">
            Home
          </span>
        </button>
        <button
          class="flex flex-col items-center text-xs transition"
          @click="navigateTo('/tabs/agenda')"
        >
          <IonIcon
            :icon="ioniconsCalendarOutline"
            class="text-xl mb-1"
            :color="$route.path === '/tabs/agenda' ? 'dark' : 'light'"
          />
          <span
            class=" text-[10px]"
            :class="$route.path === '/tabs/agenda' ? 'text-gray-800' : 'text-gray-300'">
            Agenda
          </span>
        </button>
        <button
          class="flex flex-col items-center text-xs transition"
          @click="navigateTo('/tabs/clients')"
        >
          <IonIcon
            :icon="ioniconsPeopleOutline"
            class="text-xl mb-1"
            :color="$route.path === '/tabs/clients' ? 'dark' : 'light'"
          />
          <span
            class=" text-[10px]"
            :class="$route.path === '/tabs/clients' ? 'text-gray-800' : 'text-gray-300'">
            Clients
          </span>
        </button>
        <button
          class="flex flex-col items-center text-xs transition"
          @click="navigateTo('/tabs/profile')"
        >
          <IonIcon
            :icon="ioniconsPersonOutline"
            class="text-xl mb-1"
            :color="$route.path === '/tabs/profile' ? 'dark' : 'light'"
          />
          <span
            class=" text-[10px]"
            :class="$route.path === '/tabs/profile' ? 'text-gray-800' : 'text-gray-300'">
            Compte
          </span>
        </button>
      </nav>
    </IonContent>
  </IonPage>
</template>
