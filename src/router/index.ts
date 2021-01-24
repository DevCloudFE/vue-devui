import { createRouter, createWebHistory } from 'vue-router'
import AppContent from '../components/app-content.vue'
import AppContentRoutes from './app-content-routes'

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
