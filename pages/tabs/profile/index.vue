<script setup lang="ts">
useHead({
  title: 'Profil',
})

function login() {
  useRouter().push('/login')
}
</script>

<template>
  <IonPage>
    <IonHeader :translucent="true">
      <IonToolbar>
        <IonTitle>Profile</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent :fullscreen="true">
      <IonHeader collapse="condense">
        <IonToolbar>
          <p class="px-3 text-2xl font-bold">Profil</p>
        </IonToolbar>
      </IonHeader>

      <main class="px-4 mt-4">
        <div
          @click="login"
        >
          <IonButton class="button-primary w-full">
            Connexion ou inscription
          </IonButton>
        </div>
      </main>
    </IonContent>
  </IonPage>
</template>
