<template>
    <div
      class="flex items-center gap-3 px-4 py-3 rounded-3xl shadow-lg h-[150px] w-[320px]"
      :class="bgColor"
    >
      <span
        v-if="type === 'success'"
        :class="`flex justify-center items-center h-8 w-8 rounded-[50%] ${colors[type]}`"
      >
        ✅
      </span>
  
      <span
        v-else-if="type === 'error'"
        :class="`flex justify-center items-center h-8 w-8 rounded-[50%] ${colors[type]}`"
      >
        ❌
      </span>
  
      <span
        v-else-if="type === 'info'"
        :class="`flex justify-center items-center h-8 w-8 rounded-[50%] ${colors[type]}`"
      >
        ℹ️
      </span>
  
      <span
        v-else-if="type === 'warning'"
        :class="`flex justify-center items-center h-8 w-8 rounded-[50%] ${colors[type]}`"
      >
        ⚠️
      </span>
  
      <p class="font-medium text-sm">{{ message }}</p>
    </div>
  </template>
  
  <script setup>
  defineProps({
    message: { type: String, required: true },
    type: {
      type: String,
      default: "info",
      validator: (val) => ["success", "error", "info", "warning"].includes(val),
    },
  })
  
  const colors = {
    success: "bg-emerald-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
    warning: "bg-yellow-400 text-black",
  }
  </script>
  

  