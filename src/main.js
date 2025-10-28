import { createApp } from 'vue'
import './main.css'
import App from './App.vue'
import router from './router'


// Import toastification
import Toast, { POSITION } from "vue-toastification"
import "vue-toastification/dist/index.css"

const app = createApp(App)

// Options (optional)
const options = {
  position: POSITION.TOP_RIGHT,
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
}

app.use(router)
app.use(Toast, options)
app.mount('#app')