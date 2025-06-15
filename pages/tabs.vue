<script setup lang="ts">
// const router = useRouter()
// onMounted(() => {
//   console.log('Mounted tabs page')
//   router.replace('/tabs/home')
// })
</script>

<template>
  <IonPage>
    <IonContent>
      <NuxtPage />
      <nav
        class="fixed bottom-0 left-0 right-0 bg-white border-t
         border-gray-200 flex justify-around items-center h-16 z-50">
        <NuxtLink
          to="/tabs/home"
          class="flex flex-col items-center text-xs transition"
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
