<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Card from "../components/Card.vue";
import { fetchTickets } from "../services/ticketService.js";
import { Plus } from "lucide-vue-next";

// State
const tickets = ref([]);
const router = useRouter();
const storedUserData = JSON.parse(localStorage.getItem("ticketapp_user") || "{}");

// Ensure session exists
onMounted(() => {
  const session = localStorage.getItem("ticketapp_session");
  if (!session) router.push("/auth/login");
});

// Fetch tickets
const loadTickets = async () => {
  try {
    tickets.value = await fetchTickets();
  } catch (err) {
    console.error("Error fetching tickets", err);
  }
};

onMounted(loadTickets);

// Stats
const safeDivide = (num, denom) => (denom ? (num / denom) * 100 : 0);

const totalNofTickets = computed(() => tickets.value.length);
const totalNoOfOpen = computed(() => tickets.value.filter(t => t.status === "open").length);
const totalNoOfClosed = computed(() => tickets.value.filter(t => t.status === "closed").length);
const totalNoInProgress = computed(() => tickets.value.filter(t => t.status === "in_progress").length);

const openPercent = computed(() => Math.round(safeDivide(totalNoOfOpen.value, totalNofTickets.value)));
const closedPercent = computed(() => Math.round(safeDivide(totalNoOfClosed.value, totalNofTickets.value)));
const inprogressPercent = computed(() => Math.round(safeDivide(totalNoInProgress.value, totalNofTickets.value)));

const gradient = computed(() => `conic-gradient(
  #ffdf20 0% ${openPercent.value === 0 ? 0 : openPercent.value}%,
  #fe9a00 ${openPercent.value}% ${inprogressPercent.value === 0 ? 0 : openPercent.value + inprogressPercent.value}%,
  #99a1af ${inprogressPercent.value === 0 ? 0 : inprogressPercent.value + closedPercent.value}% 100%
)`);

// Navigation
const goToAddTicket = () => router.push("/add-ticket");
</script>

<template>
  <div class="min-h-[100vh] max-w-[1440px] px-6">
    <main class="w-full pt-20 pb-6">
      <section>
        <p class="text-nowrap text-xl font-semibold ml-4">
          Welcome, {{ storedUserData.firstName?.[0].toUpperCase() + storedUserData.firstName.slice(1) }}
        </p>
      </section>

      <section class="flex justify-center items-center my-12 gap-6">
        <Card class="rounded-lg shadow-lg min-h-[150px] w-[280px] flex flex-col pl-3 justify-center items-start gap-4" bgColor="bg-green-400" textColor="text-black">
          <p class="text-stone-500 text-md font-medium">Total Number Of Opened Tickets</p>
          <p class="text-4xl font-bold">{{ totalNoOfOpen }}</p>
          <p>View all open tickets</p>
        </Card>

        <Card class="rounded-lg shadow-lg min-h-[150px] w-[280px] flex flex-col pl-3 justify-center items-start gap-4" bgColor="bg-gray-400" textColor="text-black">
          <p class="text-stone-500 text-md font-medium">Total Number Of Closed Tickets</p>
          <p class="text-4xl font-bold">{{ totalNoOfClosed }}</p>
          <p>View all closed tickets</p>
        </Card>
      </section>

      <article class="w-full relative mx-auto flex flex-col">
        <p class="text-sm font-semibold text-nowrap italic text-left pl-8">
          Below is a statistical summary of all the tickets you have ever created.
        </p>
        <div class="w-[200px] h-[200px] rounded-[50%] flex justify-center items-center self-center" :style="{ background: gradient }">
          <section class="w-[100px] h-[100px] rounded-[50%] bg-white flex justify-center items-center">
            <p class="text-center">{{ totalNofTickets }}</p>
          </section>
        </div>
      </article>

      <section class="h-44 w-[30%] pt-4 mx-auto" @click="goToAddTicket">
        <Card bgColor="bg-zinc-700" class="border-dashed border-2 h-full w-full flex justify-center items-center">
          <Plus size="38"/>
        </Card>
      </section>
    </main>
  </div>
</template>

