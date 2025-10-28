import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layout/MainLayout.vue'
import Dashboard from '../pages/Dashboard.vue'
import AddTickets from '../pages/AddTickets.vue'
import AllTickets from '../pages/AllTickets.vue'
import Landing from '../pages/Landing.vue'
import LogIn from '../pages/auth/LogIn.vue'
import SignUp from '../pages/auth/SignUp.vue'
const routes = [
  { path: '/welcome', component: Landing },
  { path: '/auth/login', component: LogIn },
  { path: '/auth/signup', component: SignUp },

  {
    path: '/',
    component: MainLayout,
    children: [
      { path: 'dashboard', component: Dashboard, meta: { requiresAuth: true } },
      { path: 'all-tickets', component: AllTickets, meta: { requiresAuth: true } },
      { path: 'add-ticket', component: AddTickets, meta: { requiresAuth: true } },
      { path: 'add-ticket/:id', component: AddTickets, meta: { requiresAuth: true } },
    ]
  },

  // Catch-all redirect
  { path: '/:pathMatch(.*)*', redirect: '/welcome' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Auth guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('ticketapp_session')

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/auth/login')
  } else {
    next()
  }
})

export default router
