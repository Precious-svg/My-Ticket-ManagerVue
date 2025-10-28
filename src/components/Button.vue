<template>
     <button
    :type="type"
    @click="onClick"
    :class="`${color} ${textColor} ${size} shadow-md rounded-md font-medium ${customClass}`"
  >
    <slot />
  </button>
</template>

<script setup>
   import { defineProps } from 'vue'
   const props = defineProps({
  type: {
    type: String,
    default: 'button'
  },
  onClick: Function,
  color: {
    type: String,
    default: 'bg-blue-500'
  },
  textColor: {
    type: String,
    default: 'text-white'
  },
  size: {
    type: String,
    default: 'w-44 h-11 text-base'
  },
  customClass: {
    type: String,
    default: ''
  }
})
</script>