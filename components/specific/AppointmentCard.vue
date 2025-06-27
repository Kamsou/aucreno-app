<template>
  <div 
    class="flex items-center space-x-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl 
    border border-gray-200 hover:bg-white/90 transition-all duration-200 cursor-pointer"
    @click="$emit('click', appointment)">
    <div 
      class="w-11 h-11 rounded-full flex-shrink-0 bg-gradient-to-br from-gray-400 
      to-gray-600 flex items-center justify-center shadow-sm">
      <span class="text-white font-medium text-xs">{{ shortTime }}</span>
    </div>
    
    <div class="flex-1 space-y-0.5">
      <p class="text-sm font-medium text-gray-800">{{ timeRange }}</p>
      
      <p class="text-xs text-gray-500">{{ appointment.clientName }}</p>
      
      <div class="flex items-center space-x-1">
        <div 
          class="w-1.5 h-1.5 rounded-full"
          :class="statusColor" />
        <p class="text-xs text-gray-400">{{ appointment.type }}</p>
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

<script setup lang="ts">
import { chevronForwardOutline } from 'ionicons/icons'

interface Appointment {
  id: string
  startTime: string // Format ISO ou "HH:mm"
  endTime: string   // Format ISO ou "HH:mm"
  clientName: string
  type: string
  status: 'confirmed' | 'pending' | 'cancelled'
}

interface Props {
  appointment: Appointment
}

const props = defineProps<Props>()

// Émettre l'événement click
defineEmits<{
  click: [appointment: Appointment]
}>()

// Extraire l'heure courte pour l'avatar (ex: "14h")
const shortTime = computed(() => {
  const time = props.appointment.startTime
  // Si c'est au format ISO, extraire l'heure
  if (time.includes('T') || time.includes(':')) {
    const hour = time.includes('T') 
      ? new Date(time).getHours()
      : parseInt(time.split(':')[0])
    return `${hour}h`
  }
  return time
})

// Créer le range d'horaires (ex: "14:00 - 15:00")
const timeRange = computed(() => {
  const formatTime = (timeStr: string) => {
    if (timeStr.includes('T')) {
      return new Date(timeStr).toLocaleTimeString('fr-FR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    }
    return timeStr
  }
  
  return `${formatTime(props.appointment.startTime)} - ${formatTime(props.appointment.endTime)}`
})

// Couleur du statut
const statusColor = computed(() => {
  switch (props.appointment.status) {
  case 'confirmed': return 'bg-green-400'
  case 'pending': return 'bg-amber-400'
  case 'cancelled': return 'bg-red-400'
  default: return 'bg-blue-400'
  }
})
</script>
