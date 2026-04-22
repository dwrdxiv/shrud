import { createRouter, createWebHistory } from 'vue-router'
import AdminZapatos from '../components/AdminZapatos.vue'
import HomeView from '@/components/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/inventario',
      name: 'inventario',
      component: AdminZapatos
    }
  ]
})

export default router