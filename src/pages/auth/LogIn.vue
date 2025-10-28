<!-- LogIn.vue -->
<template>
    <div class="w-full max-w-md mx-auto mt-20 p-6 bg-white shadow-lg rounded-md">
      <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
        <div class="flex flex-col gap-1">
          <label for="email" class="font-medium text-lg">Email</label>
          <input 
            type="email" 
            v-model="email" 
            id="email" 
            placeholder="Enter your email"
            class="py-2 px-3 border-2 border-stone-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
  
        <div class="flex flex-col gap-1">
          <label for="password" class="font-medium text-lg">Password</label>
          <input 
            type="password" 
            v-model="password" 
            id="password" 
            placeholder="Enter your password"
            class="py-2 px-3 border-2 border-stone-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
  
        <p v-if="error" class="text-red-500">{{ error }}</p>
  
        <button 
          type="submit" 
          class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { showToast } from '../../assets/showToast'
  
  const email = ref('')
  const password = ref('')
  const error = ref('')
  const router = useRouter()
  
  const storedData = JSON.parse(localStorage.getItem("ticketapp_user"))
  
  function handleLogin() {
    if (!email.value || !password.value) {
      error.value = "All fields are required!"
      return
    }
  
    if (!storedData) {
      console.log("this user does not exist")
      router.push("/welcome")
      return
    }
  
    if (email.value.trim() === storedData.email && password.value.trim() === storedData.password) {
      localStorage.setItem("ticketapp_session", "token@1234")
      console.log("log in successful")
      showToast("Log In Successful", "success")
      router.push("/dashboard")
    } else {
      console.log("Invalid email or password!")
      showToast("Invalid email or password!", "error")
      router.push("/")
    }
  }
  </script>
  
  
  