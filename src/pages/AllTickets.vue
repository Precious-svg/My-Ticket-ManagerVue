<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import TicketCard from "../components/TicketCard.vue";
import { showToast } from '../assets/showToast'
import { fetchTickets, updateTicket, deleteTicket } from "../services/ticketService.js";

const tickets = ref([]);
const newStatus = ref("");
const showConfirm = ref(false);
const idToDel = ref(null);
const router = useRouter();

const loadTickets = async () => {
  const all = await fetchTickets();
  tickets.value = all;
};

// Handle advancing status
const handleStatus = async (id, stat) => {
  let statusUpdate;
  if (stat === "open") statusUpdate = "in_progress";
  else if (stat === "in_progress") statusUpdate = "closed";

  if (statusUpdate) {
    await updateTicket(id, { status: statusUpdate });
    showToast("Status Updated Successfully", "success");
    newStatus.value = statusUpdate; // trigger reload
  }
};

// Handle edit
const handleEdit = (id) => {
  router.push(`/add-ticket/${id}`);
};

// Delete confirmation
const handleDelete = (id) => {
  idToDel.value = id;
  showConfirm.value = true;
  showToast("You are about to delete your ticket", "warning");
};

const confirmDelete = async () => {
  if (idToDel.value) {
    const done = await deleteTicket(idToDel.value);
    if (done) {
      showConfirm.value = false;
      await loadTickets();
      router.push("/all-tickets");
    }
  }
};

const cancelDelete = () => {
  showConfirm.value = false;
};

// Initial load
onMounted(loadTickets);

// Reload tickets whenever newStatus changes
watch(newStatus, loadTickets);
</script>

<template>
  <div class="w-full max-w-[1440px] pt-24">
    <section class="w-[90%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
      <TicketCard
        v-for="item in tickets"
        :key="item.id"
        :ticket="item"
        @onDelete="() => handleDelete(item.id)"
        @onAdvance="() => handleStatus(item.id, item.status)"
        @onEdit="() => handleEdit(item.id)"
      />
    </section>

    <div v-if="showConfirm" class="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div class="w-[90%] py-6 bg-white shadow-lg mx-auto px-8 mt-6 lg:absolute lg:w-[30%] left-[30%] right-[30%] top-[40%]">
        <p class="text-base font-lato tracking-wide text-center w-full -mt-4">
          Are you sure you want to cancel this booking?
        </p>
        <div class="w-full flex justify-between mt-12 rounded-sm gap-4">
          <button @click="cancelDelete" class="font-lato text-black text-sm tracking-wide py-2 px-6">No</button>
          <button @click="confirmDelete" class="bg-[#F43434] font-lato text-bgWhite text-sm tracking-wide py-2 px-8 rounded-lg">
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add your Tailwind or custom styles here */
</style>
