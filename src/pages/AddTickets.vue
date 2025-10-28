
<template>
    <div class="w-full max-w-[1440px] pt-20 px-4 min-h-[100vh] flex items-center">
      <TicketForm
        :initial="initialData"
        :submit-label="edit ? 'Edit Ticket' : 'Create Ticket'"
        :is-editing="edit"
        @save="handleSave"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import TicketForm from '../components/TicketForm.vue'
  import { createTicket, updateTicket, fetchOneTicket } from '../services/ticketService'
  import { showToast } from '../assets/showToast'
  const route = useRoute()
  const router = useRouter()
  
  const id = ref(route.params.id)
  const edit = ref(false)
  const initialData = ref({})
  
  watch(() => route.params.id, (newId) => {
    id.value = newId
    loadTicketIfNeeded()
  })
  
  const loadTicketIfNeeded = async () => {
    if (id.value) {
      edit.value = true
      const ticket = await fetchOneTicket(id.value)
      initialData.value = ticket
    } else {
      edit.value = false
      initialData.value = {}
    }
  }
  
  onMounted(() => {
    loadTicketIfNeeded()
  })
  
  const handleSave = async (updates) => {
    if (edit.value) {
      await updateTicket(id.value, updates)
      showToast("Ticket Updated Successfully", "success")
    } else {
      await createTicket(updates)
      showToast("Ticket Created Successfully", "success")
      router.push("/all-tickets")
    }
  }
  </script>
  
  <style scoped>
  /* Optional styles */
  </style>
  