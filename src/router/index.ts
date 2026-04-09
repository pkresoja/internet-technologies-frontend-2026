import About from '@/pages/About.vue'
import Details from '@/pages/Details.vue'
import Home from '@/pages/Home.vue'
import Table from '@/pages/Table.vue'
import Airlines from '@/pages/airline/Airlines.vue'
import EditAirline from '@/pages/airline/EditAirline.vue'
import NewAirline from '@/pages/airline/NewAirline.vue'
import NewTicket from '@/pages/ticket/NewTicket.vue'
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
      path: '/details/:id/order',
      component: NewTicket,
      meta: {
        title: 'Order'
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
      component: Airlines,
      meta: {
        title: 'Airlines'
      }
    },
    {
      path: '/airline/new',
      component: NewAirline,
      meta: {
        title: 'New Airline'
      }
    },
    {
      path: '/airline/:id',
      component: EditAirline,
      meta: {
        title: 'Edit Airline'
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
