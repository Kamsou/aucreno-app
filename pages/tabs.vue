<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
  <IonPage>
    <IonContent>
      <IonTabs>
        <IonRouterOutlet />

        <IonTabBar slot="bottom">
          <IonTabButton
            tab="home"
            href="/tabs/home">
            <IonIcon :icon="ioniconsHomeOutline" />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton
            tab="agenda"
            href="/tabs/agenda">
            <IonIcon :icon="ioniconsImagesOutline" />
            <IonLabel>Agenda</IonLabel>
          </IonTabButton>
          <IonTabButton
            tab="clients"
            href="/tabs/clients">
            <IonIcon :icon="ioniconsBulbOutline" />
            <IonLabel>Clients</IonLabel>
          </IonTabButton>
          <IonTabButton
            tab="profile"
            href="/tabs/profile">
            <IonIcon :icon="ioniconsAccessibilityOutline" />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonContent>
  </IonPage>
</template>
