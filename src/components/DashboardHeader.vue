<template>
    <aside
      class="cursor-pointer z-50 bg-neutral-100 flex flex-col border-l-2 justify-start h-screen absolute top-0 bottom-0 left-0 transition-all duration-300 ease-in-out"
      :class="isButtonOpen ? 'w-52 translate-x-0' : 'w-0 translate-x-full lg:w-64'"
    >
      <h3
        class="mx-auto text-2xl font-bold my-8 italic py-3 px-4 rounded-md bg-white flex gap-2 items-center"
      >
        <TicketsPlane :size="35" class="fill-[#193cb8]" /> MyTicketApp
      </h3>
  
      <section class="flex flex-col gap-6 pt-8">
        <div
          v-for="item in navItems"
          :key="item.name"
          @click="navigate(item.path)"
          :class="['mx-3 flex items-center gap-6 py-3 px-4', isActive(item.path) ? 'bg-blue-900 rounded-md' : 'bg-none']"
        >
          <component :is="item.icon" :size="25" :stroke="isActive(item.path) ? '#f8fafc' : '#292524'" />
          <p :class="['text-base font-medium', isActive(item.path) ? 'text-white' : '']">{{ item.name }}</p>
        </div>
      </section>
  
      <div class="w-full mt-80" @click="handleLogOut">
        <div class="w-full border-t-2 border-gray-500 my-6"></div>
        <div class="pl-6 flex items-center gap-6">
          <LogOut size="25" stroke="#ec003f" />
          <p>Log Out</p>
        </div>
      </div>
    </aside>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { LogOut, LibraryBig, LayoutDashboard, Ticket, TicketsPlane } from 'lucide-vue-next'
  import { logout } from '../services/ticketService.js' // adjust path
  
  const props = defineProps({
    isButtonOpen: Boolean
  })
  
  const router = useRouter()
  const route = useRoute()
  
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Add Ticket', icon: Ticket, path: '/add-ticket' },
    { name: 'All Tickets', icon: LibraryBig, path: '/all-tickets' }
  ]
  
  const navigate = (path) => {
    router.push(path)
  }
  
  const isActive = (path) => route.path === path
  
  const handleLogOut = async () => {
    await logout()
    router.push('/auth/login')
  }
  </script>
  