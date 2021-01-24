import { createRouter, createWebHistory } from 'vue-router'
import AppContentRoutes from './components/component.route'
import AppContent from './components/app-content.vue'

const routerHistory = createWebHistory()

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      redirect: '/components'
    },
    {
      path: '/components',
      component: AppContent,
      children: AppContentRoutes
    }
  ]
})

export default router
