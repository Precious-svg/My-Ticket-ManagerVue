<template>
  <div :class="`${bgColor} ${textColor} ${size} ${shadow} ${customClass}`">
    <slot />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  bgColor: {
    type: String,
    default: 'bg-blue-500'
  },
  textColor: {
    type: String,
    default: 'text-white'
  },
  size: {
    type: String,
    default: 'px-2 text-base'
  },
  shadow: {
    type: String,
    default: 'shadow-md'
  },
  customClass: {
    type: String,
    default: ''
  }
})
</script>
