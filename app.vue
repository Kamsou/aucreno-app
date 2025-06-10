<script setup lang="ts">
import { IonApp, IonContent } from '@ionic/vue';
import '@ionic/vue/css/core.css';
import '@ionic/vue/css/ionic.bundle.css';
import '@/assets/main.css'
</script>

<template>
  <IonApp>
    <IonContent>
      <NuxtPage />
      <InstallPrompt />
    </IonContent>
  </IonApp>
</template>
