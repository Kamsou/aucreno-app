<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

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

function updateValue(event: Event) {
  let inputValue = (event.target as HTMLInputElement).value

  if (props.type === 'email') {
    inputValue = inputValue.toLowerCase()
  }

  emit('update:modelValue', inputValue)
}
</script>

<template>
  <div>
    <label
      v-if="label"
      class="block text-sm not-italic text-gray-light tracking-tight pb-1"
    >{{ label }}</label>

    <input
      :value="modelValue"
      :type="type || 'text'"
      class="border border-[#E5E5E5] p-2 rounded-xl bg-gray-100 placeholder-gray-light text-sm 
      placeholder-opacity-80 overflow-hidden h-[50px] w-full tracking-tight"
      :class="disabled ? 'cursor-not-allowed text-gray-400 italic' : 'text-gray-800'"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="updateValue"
    >
  </div>
</template>
