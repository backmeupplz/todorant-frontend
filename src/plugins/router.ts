// Dependencies
import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Superpower from '../views/Superpower.vue'
import NotFound from '../views/NotFound.vue'
import Privacy from '../views/Privacy.vue'
import Terms from '../views/Terms.vue'
import Payment from '../views/Payment.vue'
import LoginTelegram from '../views/LoginTelegram.vue'
import LoginApple from '../views/LoginApple.vue'
import MobileLoginSuccess from '../views/MobileLoginSuccess.vue'
import MobileLoginError from '../views/MobileLoginError.vue'
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
      path: '/mobile-login/telegram',
      name: 'mobile_login_telegram',
      component: LoginTelegram,
    },
    {
      path: '/mobile-login/apple',
      name: 'mobile_login_apple',
      component: LoginApple,
    },
    {
      path: '/mobile_login_success',
      name: 'mobile_login_success',
      component: MobileLoginSuccess,
    },
    {
      path: '/mobile_login_error',
      name: 'mobile_login_error',
      component: MobileLoginError,
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
