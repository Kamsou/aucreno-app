<script setup lang="ts">
import { ref, defineProps, defineEmits  } from 'vue'

interface Props {
  modelValue: string
  placeholder?: string
  label?: string
  disabled?: boolean
  type?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const showPassword = ref(false)

function updateValue(event: Event) {
  let inputValue = (event.target as HTMLInputElement).value

  if (props.type === 'email') {
    inputValue = inputValue.toLowerCase()
  }

  emit('update:modelValue', inputValue)
}

function toggleShowPassword() {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <div class="relative">
    <label
      v-if="label"
      class="block text-sm not-italic text-gray-light tracking-tight pb-1"
    >{{ label }}</label>

    <input
      :value="modelValue"
      :type="type === 'password' && !showPassword ? 'password' : 'text'"
      class="border border-[#E5E5E5] p-2 rounded-xl bg-gray-100 placeholder-gray-light text-sm 
      placeholder-opacity-80 overflow-hidden h-[50px] w-full tracking-tight placeholder:text-sm pr-16"
      :class="disabled ? 'cursor-not-allowed text-gray-400 italic' : 'text-gray-800'"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="updateValue"
    >
    <button
      v-if="type === 'password'"
      type="button"
      class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 select-none"
      tabindex="-1"
      @click="toggleShowPassword"
    >
      {{ showPassword ? 'Cacher' : 'Voir' }}
    </button>
  </div>
</template>
