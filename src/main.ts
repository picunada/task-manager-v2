import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router/auto'
import App from './App.vue'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(),
})

app.use(createPinia()).use(router)

app.mount('#app')
