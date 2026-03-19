import About from '@/pages/About.vue'
import Airline from '@/pages/Airline.vue'
import Details from '@/pages/Details.vue'
import Home from '@/pages/Home.vue'
import Table from '@/pages/Table.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Home,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/about',
      component: About,
      meta: {
        title: 'About'
      }
    },
    {
      path: '/table',
      component: Table,
      meta: {
        title: 'Table View'
      }
    },
    {
      path: '/details/:id',
      component: Details,
      meta: {
        title: 'Details'
      }
    },
    {
      path: '/airline',
      component: Airline,
      meta: {
        title: 'Airlines'
      }
    }
  ]
})

router.afterEach((to, form, next) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} :: Tickets`
  }
})

export default router
