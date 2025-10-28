<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import Input from './Input.vue'
import Button from './Button.vue'

const props = defineProps({
  initial: { type: Object, default: () => ({}) },
  onSave: { type: Function, required: true },
  submitLabel: { type: String, default: 'Save' },
  isEditing: Boolean
})

const router = useRouter()

const VALID_STATUSES = ["open", "in_progress", "closed"]

const title = ref(props.initial.title || '')
const description = ref(props.initial.description || '')
const status = ref(props.initial.status || 'open')
const priority = ref(props.initial.priority || 'normal')
const errors = ref({})

watch(
  () => props.initial,
  (newVal) => {
    title.value = newVal.title || ''
    description.value = newVal.description || ''
    status.value = newVal.status || 'open'
    priority.value = newVal.priority || 'normal'
  },
  { deep: true }
)

function validate() {
  const e = {}
  if (!title.value.trim()) e.title = 'Title is required.'
  if (!VALID_STATUSES.includes(status.value)) e.status = 'Status must be open, in_progress, or closed.'
  if (description.value && description.value.length > 1000) e.description = 'Description too long (max 1000 chars).'
  errors.value = e
  return Object.keys(e).length === 0
}

function handleSubmit(ev) {
  ev.preventDefault()
  if (!validate()) return
  props.onSave({
    title: title.value.trim(),
    description: description.value.trim(),
    status: status.value,
    priority: priority.value
  })
  console.log('new edit saved')
  router.push('/all-tickets')
}
</script>

<template>
  <form @submit="handleSubmit" class="w-[50%] mx-auto mt-9 flex flex-col items-start rounded-md px-4 py-6 bg-blue-50 shadow-lg" aria-label="ticket-form">

    <!-- Title -->
    <div class="flex flex-col gap-2 w-full">
      <label for="title" class="text-lg font-medium">Title</label>
      <Input
        v-model="title"
        name="title"
        placeholder="e.g Cook Tonight"
        class="bg-white border-stone-600 border-2 py-4"
        :aria-describedby="errors.title ? 'err-title' : undefined"
      />
      <div v-if="errors.title" id="err-title" class="error" role="alert">{{ errors.title }}</div>
    </div>

    <!-- Status & Priority -->
    <section class="w-full flex justify-between my-4">
      <div class="flex items-center gap-2">
        <label for="status" class="text-lg font-medium">Status</label>
        <select id="status" v-model="status" class="bg-white rounded-md border-stone-200 border-2 p-4" :aria-describedby="errors.status ? 'err-status' : undefined">
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
        <div v-if="errors.status" id="err-status" class="text-red-400" role="alert">{{ errors.status }}</div>
      </div>

      <div class="flex items-center gap-2">
        <select id="priority" v-model="priority" class="bg-white rounded-md border-stone-200 border-2 px-6 py-4">
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </select>
        <label for="priority" class="text-lg font-medium">Priority</label>
      </div>
    </section>

    <!-- Description -->
    <div class="flex flex-col items-start gap-2 w-full my-6">
      <label for="description" class="text-lg font-medium">Description</label>
      <textarea
        id="description"
        rows="5"
        v-model="description"
        placeholder="Cook dinner for family using the recipe that was learnt online yesterday. Then get a Champange and toast to the new job."
        class="bg-white border-stone-600 rounded-md border-2 py-4 px-4 w-full"
      ></textarea>
      <div v-if="errors.description" class="error" role="alert">{{ errors.description }}</div>
    </div>

    <!-- Submit Button -->
    <div class="my-6 mx-auto">
      <Button type="submit" class="bg-pink-500">{{ submitLabel }}</Button>
    </div>

  </form>
</template>
