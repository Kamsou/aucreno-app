<script setup lang="ts">
definePageMeta({
  alias: ['/tabs'],
})
useHead({
  title: 'Home',
})
</script>

<template>
  <IonPage>
    <IonContent :fullscreen="true">
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large">
            Home
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonButton class="button-primary">
        coucou
      </IonButton>
    </IonContent>
  </IonPage>
</template>
