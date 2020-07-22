import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Superpower from '@/views/Superpower.vue'
import NotFound from '@/views/static/NotFound.vue'
import Privacy from '@/views/static/Privacy.vue'
import Terms from '@/views/static/Terms.vue'
import Payment from '@/views/static/Payment.vue'
import LoginTelegram from '@/views/LoginTelegram.vue'
import MobileLoginSuccess from '@/views/static/MobileLoginSuccess.vue'
import MobileLoginError from '@/views/static/MobileLoginError.vue'
import store from '@/store'
import PublicReport from '@/views/PublicReport.vue'
import AppleFirefoxError from '@/views/static/AppleFirefoxError.vue'
import GoogleCalendarSetup from '@/views/static/GoogleCalendarSetup.vue'
import DelegateInvite from '@/views/delegate/DelegateInvite.vue'

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
      path: '/apple_firefox_error',
      name: 'apple_firefox_error',
      component: AppleFirefoxError,
    },
    {
      path: '/google_calendar_setup_web',
      name: 'google_calendar_setup_web',
      component: GoogleCalendarSetup,
    },
    {
      path: '/invite/*',
      name: 'delegate_invite',
      component: DelegateInvite,
    },
    {
      path: '*',
      name: 'not_found',
      component: NotFound,
    },
  ],
})

router.beforeEach((to, _, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const user = store.state.UserStore.user

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
