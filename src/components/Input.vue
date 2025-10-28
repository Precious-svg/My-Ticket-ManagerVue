<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  type: { type: String, default: 'text' },
  modelValue: [String, Number],
  name: String,
  placeholder: { type: String, default: '' },
  className: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue', 'input'])

function onInput(event) {
  emit('update:modelValue', event.target.value)
  emit('input', event)
}
</script>

<template>
  <input
    :type="props.type"
    :name="props.name"
    :placeholder="props.placeholder"
    :value="props.modelValue"
    @input="onInput"
    :class="`py-2 px-3 border-3 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-md ${props.className}`"
    v-bind="$attrs"
  />
</template>
