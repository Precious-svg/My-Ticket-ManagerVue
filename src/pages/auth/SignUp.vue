<!-- SignUp.vue -->
<template>
    <div class="w-full max-w-md mx-auto mt-20 p-6 bg-white shadow-lg rounded-md">
      <header>
        <h3 class="text-xl font-semibold mb-4">Fill the form to create an account</h3>
      </header>
  
      <main>
        <form @submit.prevent="handleSignup" class="flex flex-col gap-4">
          <div class="flex flex-col gap-1">
            <label for="firstName" class="font-medium">First Name</label>
            <input
              type="text"
              v-model="firstName"
              id="firstName"
              placeholder="First Name"
              class="py-2 px-3 border-2 border-stone-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
  
          <div class="flex flex-col gap-1">
            <label for="lastName" class="font-medium">Last Name</label>
            <input
              type="text"
              v-model="lastName"
              id="lastName"
              placeholder="Last Name"
              class="py-2 px-3 border-2 border-stone-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
  
          <div class="flex flex-col gap-1">
            <label for="email" class="font-medium">Email</label>
            <input
              type="email"
              v-model="email"
              id="email"
              placeholder="Email"
              class="py-2 px-3 border-2 border-stone-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
  
          <div class="flex flex-col gap-1">
            <label for="password" class="font-medium">Password</label>
            <input
              type="password"
              v-model="password"
              id="password"
              placeholder="Password"
              class="py-2 px-3 border-2 border-stone-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
  
          <div class="flex flex-col gap-1">
            <label for="confirmPassword" class="font-medium">Confirm Password</label>
            <input
              type="password"
              v-model="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm Password"
              class="py-2 px-3 border-2 border-stone-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
  
          <p v-if="errorMsg" class="text-red-500">{{ errorMsg }}</p>
  
          <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            Sign Up
          </button>
        </form>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import showToast from '../../assets/showToast'
  
  const firstName = ref('')
  const lastName = ref('')
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const errorMsg = ref('')
  const router = useRouter()
  
  const isFormValid = () => {
    const errors = []
  
    if (!firstName.value.trim()) errors.push("First name cannot be blank!")
    if (!lastName.value.trim()) errors.push("Last name cannot be blank!")
    if (!password.value.trim()) errors.push("Password is required!")
    else if (password.value.length < 6) errors.push("Password is too short!")
    if (password.value !== confirmPassword.value) errors.push("Passwords must match!")
  
    if (errors.length > 0) {
      errorMsg.value = errors[0]
      return false
    }
  
    errorMsg.value = ""
    return true
  }
  
  const handleSignup = () => {
    if (isFormValid()) {
      const userData = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value
      }
      localStorage.setItem("ticketapp_user", JSON.stringify(userData))
      showToast("Sign Up Successful", "success")
      router.push("/auth/login")
      return
    }
  
    showToast("Review the details submitted.", "error")
  }
  </script>
  
  <style scoped>
  /* optional custom styles */
  </style>
  