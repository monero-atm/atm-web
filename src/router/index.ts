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
        },
        {
          path: '/payment',
          name: 'Payment',
          component: () => import('../views/PaymentView.vue')
        },
        {
          path: '/cancel',
          name: 'Cancel',
          component: () => import('../views/CancelView.vue'),
          meta: { hideHeader: true }
        }
      ]
    }
  ]
})

export default router
