<template>
  <div class="space-y-4 px-4">
    <div
      v-for="n in count"
      :key="n"
      class="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100"
    >
      <!-- Avatar skeleton -->
      <div class="w-12 h-12 rounded-full flex-shrink-0 skeleton-shimmer" />
      
      <div class="flex-1 space-y-2">
        <!-- Name skeleton -->
        <div class="h-4 w-3/4 rounded skeleton-shimmer" />
        
        <!-- Email skeleton -->
        <div class="h-3 w-1/2 rounded skeleton-shimmer" />
        
        <!-- Additional info skeleton -->
        <div class="h-3 w-2/3 rounded skeleton-shimmer" />
      </div>
      
      <!-- Action button skeleton -->
      <div class="w-8 h-8 rounded-full flex-shrink-0 skeleton-shimmer" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  count?: number
}

withDefaults(defineProps<Props>(), {
  count: 5
})
</script>

<style scoped>
.skeleton-shimmer {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
</style>
