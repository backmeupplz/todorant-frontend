// Dependencies
import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Superpower from '../views/Superpower.vue'
import NotFound from '../views/NotFound.vue'
import Privacy from '../views/Privacy.vue'
import Terms from '../views/Terms.vue'
import Payment from '../views/Payment.vue'
import { store } from './store'
import PublicReport from '../views/PublicReport.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: Privacy,
    },
    {
      path: '/terms',
      name: 'terms',
      component: Terms,
    },
    {
      path: '/superpower',
      name: 'superpower',
      component: Superpower,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/payment_success',
      name: 'payment_success',
      component: Payment,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/payment_failure',
      name: 'payment_failure',
      component: Payment,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/report/*',
      name: 'public_report',
      component: PublicReport,
    },
    {
      path: '*',
      name: 'not_found',
      component: NotFound,
    },
  ],
})

router.beforeEach((to, _, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const user = store.state.user

  if (requiresAuth && !user) {
    next('/')
  } else {
    if (to.path === '/' && user) {
      next({ name: 'superpower', query: to.query })
    } else {
      next()
    }
  }
})

export default router
