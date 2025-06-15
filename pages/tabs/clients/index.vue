<script setup lang="ts">
useHead({
  title: 'Clients',
})

function login() {
  useRouter().push('/login')
}
</script>

<template>
  <IonPage>
    <IonHeader :translucent="true">
      <IonToolbar>
        <IonTitle>Clients</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent :fullscreen="true">
      <IonHeader collapse="condense">
        <IonToolbar>
          <p class="px-3 text-2xl font-bold">Clients</p>
        </IonToolbar>
      </IonHeader>

      <main class="px-4 mt-4">
        <p class="text-md font-bold">Connectes-toi pour voir ta liste de clients</p>

        <p class="text-sm">
          Tu peux créer, consulter et modifier tes clients en te connectant à votre compte
        </p>

        <div
          class="mt-8"
          @click="login"
        >
          <IonButton class="button-primary w-full">
            Connexion
          </IonButton>
        </div>
      </main>
    </IonContent>
  </IonPage>
</template>
