<script setup lang="ts">
import {
  homeOutline as ioniconsHomeOutline,
  calendarOutline as ioniconsCalendarOutline,
  peopleOutline as ioniconsPeopleOutline,
  personOutline as ioniconsPersonOutline
} from 'ionicons/icons'
</script>

<template>
  <IonPage>
    <IonContent>
      <slot />
      
      <nav
        class="fixed left-0 right-0 bg-white border-t
         border-gray-200 flex justify-around items-center z-[9999] tab-bar-safari"
        style="bottom: env(safe-area-inset-bottom, 0px);
               height: 4rem; 
               margin-bottom: 0px;">
        <NuxtLink
          replace
          to="/"
          class="flex flex-col items-center text-xs transition py-2"
        >
          <IonIcon
            :icon="ioniconsHomeOutline"
            class="text-xl mb-1"
            :color="$route.path === '/' ? 'dark' : 'light'"
          />
          <span
            class="text-[10px]"
            :class="$route.path === '/' ? 'text-gray-800' : 'text-gray-300'">
            Home
          </span>
        </NuxtLink>
        <NuxtLink
          replace
          to="/tabs/agenda"
          class="flex flex-col items-center text-xs transition"
        >
          <IonIcon
            :icon="ioniconsCalendarOutline"
            class="text-xl mb-1"
            :color="$route.path === '/tabs/agenda' ? 'dark' : 'light'"
          />
          <span
            class="text-[10px]"
            :class="$route.path === '/tabs/agenda' ? 'text-gray-800' : 'text-gray-300'">
            Agenda
          </span>
        </NuxtLink>
        <NuxtLink
          replace
          to="/tabs/clients"
          class="flex flex-col items-center text-xs transition"
        >
          <IonIcon
            :icon="ioniconsPeopleOutline"
            class="text-xl mb-1"
            :color="$route.path === '/tabs/clients' ? 'dark' : 'light'"
          />
          <span
            class="text-[10px]"
            :class="$route.path === '/tabs/clients' ? 'text-gray-800' : 'text-gray-300'">
            Clients
          </span>
        </NuxtLink>
        <NuxtLink
          replace
          to="/tabs/profile"
          class="flex flex-col items-center text-xs transition"
        >
          <IonIcon
            :icon="ioniconsPersonOutline"
            class="text-xl mb-1"
            :color="$route.path === '/tabs/profile' ? 'dark' : 'light'"
          />
          <span
            class="text-[10px]"
            :class="$route.path === '/tabs/profile' ? 'text-gray-800' : 'text-gray-300'">
            Compte
          </span>
        </NuxtLink>
      </nav>
    </IonContent>
  </IonPage>
</template>
