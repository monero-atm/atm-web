import { createRouter, createWebHistory } from 'vue-router'
import StackedLayout from '@/layouts/StackedLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: StackedLayout,
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('../views/HomeView.vue')
        },
        {
          path: '/wallet',
          name: 'Wallet',
          component: () => import('../views/WalletAddressView.vue')
        }
      ]
    }
  ]
})

export default router