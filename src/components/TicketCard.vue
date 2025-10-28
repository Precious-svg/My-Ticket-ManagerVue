<script setup>
import { defineProps } from 'vue'
import Card from './Card.vue'
import Button from './Button.vue'
import { FlagTriangleRight } from 'lucide-vue-next'

const props = defineProps({
  ticket: Object,
  onAdvance: Function,
  onEdit: Function,
  onDelete: Function
})

const getBgColor = (status) => {
  if (status === 'open') return 'bg-green-300'
  if (status === 'closed') return 'bg-gray-400'
  if (status === 'in_progress') return 'bg-amber-500'
  return 'bg-white'
}

const getPriorityColor = (priority) => {
  if (priority === 'high') return '#c10007'
  if (priority === 'normal') return '#9810fa'
  if (priority === 'low') return '#497d00'
  return '#000000'
}
</script>

<template>
  <article :aria-labelledby="`t-${ticket.id}`">
    <Card :class="'rounded-lg shadow-xl px-6 py-4 min-h-[200px]'" :bgColor="getBgColor(ticket.status)">
      <h3 class="text-xl font-semibold text-stone-800 my-2">{{ ticket.title }}</h3>
      <p class="text-md font-medium">{{ ticket.description }}</p>
      <div class="my-2 bg-stone-800 w-[40%] p-1 rounded-xl" aria-hidden="true">
        {{ ticket.status.replace('_', ' ').toUpperCase() }}
      </div>

      <div class="kv mt-3">
        <p class="text-sm flex gap-2 text-gray-500">
          Priority: {{ ticket.priority }}
          <FlagTriangleRight :fill="getPriorityColor(ticket.priority)" />
        </p>

        <div class="my-3 flex gap-4 justify-between items-center">
          <Button @click="() => props.onAdvance(ticket)" color="bg-emerald-200" textColor="text-stone-900" class="border border-white cursor-pointer">
            Advance
          </Button>

          <Button @click="() => props.onDelete(ticket)" color="bg-red-600" class="cursor-pointer">
            Delete
          </Button>

          <Button @click="() => props.onEdit(ticket)" color="bg-sky-400" textColor="text-stone-600" class="border border-white cursor-pointer">
            Edit
          </Button>
        </div>
      </div>
    </Card>
  </article>
</template>
