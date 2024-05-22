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
          path: '/',
          name: 'Home',
          component: () => import('../views/IdleView.vue')
        },
        {
          path: '/scan',
          name: 'Scan',
          component: () => import('../views/ScanView.vue')
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
          path: '/review',
          name: 'Review',
          component: () => import('../views/ReviewView.vue')
        },
        {
          path: '/error/:errorType',
          name: 'Error',
          component: () => import('../views/ErrorView.vue'),
          meta: { hideHeader: true }
        },
        {
          path: '/success',
          name: 'Success',
          component: () => import('../views/SuccessView.vue'),
          meta: { hideHeader: true }
        },
        {
          path: ':pathMatch(.*)*',
          redirect: { name: 'Home' }
        }
      ]
    }
  ]
})

export default router
