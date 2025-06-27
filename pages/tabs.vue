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
        <NuxtLink
          to="/tabs/home"
          class="flex flex-col items-center text-xs transition py-2"
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
        </NuxtLink>
        <NuxtLink
          to="/tabs/agenda"
          class="flex flex-col items-center text-xs transition"
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
        </NuxtLink>
        <NuxtLink
          to="/tabs/clients"
          class="flex flex-col items-center text-xs transition"
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
        </NuxtLink>
        <NuxtLink
          to="/tabs/profile"
          class="flex flex-col items-center text-xs transition"
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
        </NuxtLink>
      </nav>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import {
  homeOutline as ioniconsHomeOutline,
  calendarOutline as ioniconsCalendarOutline,
  peopleOutline as ioniconsPeopleOutline,
  personOutline as ioniconsPersonOutline
} from 'ionicons/icons'
import { onMounted } from 'vue'

// Détecter Safari et ajuster la position de la tab bar
onMounted(() => {
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches
  
  if (isSafari && !isStandalone) {
    // En mode Safari web, ajuster la position
    const tabBar = document.querySelector('.tab-bar-safari') as HTMLElement
    if (tabBar) {
      tabBar.style.bottom = '85px' // Au-dessus de la barre Safari
    }
  }
})
</script>
