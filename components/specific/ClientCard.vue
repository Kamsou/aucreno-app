<script setup lang="ts">
import { chevronForwardOutline } from 'ionicons/icons'

interface Client {
  id: string
  name: string
  email: string
  status: 'active' | 'pending' | 'inactive'
  lastSession?: string
}

interface Props {
  client: Client
}

const props = defineProps<Props>()

defineEmits<{
  click: [client: Client]
}>()

const initials = computed(() => {
  const names = props.client.name.split(' ')
  return names.length >= 2 
    ? `${names[0][0]}${names[1][0]}`.toUpperCase()
    : names[0].substring(0, 2).toUpperCase()
})

const avatarColor = computed(() => {
  return 'from-gray-400 to-gray-600'
})

const statusColor = computed(() => {
  switch (props.client.status) {
  case 'active': return 'bg-green-400'
  case 'pending': return 'bg-amber-400'
  case 'inactive': return 'bg-gray-400'
  default: return 'bg-gray-400'
  }
})

const statusText = computed(() => {
  const statusTexts = {
    active: 'Active',
    pending: 'En attente',
    inactive: 'Inactive'
  }
  
  const status = statusTexts[props.client.status] || 'Inconnue'
  const date = props.client.lastSession ? ` · ${props.client.lastSession}` : ''
  
  return `${status}${date}`
})
</script>


<template>
  <div 
    class="flex items-center space-x-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl 
    border border-gray-200 hover:bg-white/90 transition-all duration-200 cursor-pointer"
    @click="$emit('click', client)">
    <div 
      class="w-11 h-11 rounded-full flex-shrink-0 bg-gradient-to-br flex items-center justify-center shadow-sm"
      :class="avatarColor">
      <span class="text-white font-medium text-xs">{{ initials }}</span>
    </div>
    
    <div class="flex-1 space-y-0.5">
      <p class="text-md font-medium text-gray-800">{{ client.name }}</p>
      
      <p class="text-xs text-gray-500">{{ client.email }}</p>
      
      <div class="flex items-center space-x-1">
        <div 
          class="w-1.5 h-1.5 rounded-full"
          :class="statusColor" />
        <p class="text-xs text-gray-400">{{ statusText }}</p>
      </div>
    </div>
    
    <div class="w-7 h-7 rounded-full flex-shrink-0 bg-gray-50 flex items-center justify-center">
      <IonIcon
        :icon="chevronForwardOutline"
        class="text-gray-400 text-xs"
      />
    </div>
  </div>
</template>
