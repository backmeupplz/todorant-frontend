import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
// We are using these strange imports because of lazy loading with vue-class-components)

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      alias: [
        '/facebook_login_result',
        '/google_login_result',
        '/apple_login_result',
      ],
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('@/views/static/Privacy.vue'),
    },
    {
      path: '/terms',
      name: 'terms',
      component: () => import('@/views/static/Terms.vue'),
    },
    {
      path: '/mobile-login/telegram',
      name: 'mobile_login_telegram',
      component: () => import('@/views/LoginTelegram.vue'),
    },
    {
      path: '/mobile_login_success',
      name: 'mobile_login_success',
      component: () => import('@/views/static/MobileLoginSuccess.vue'),
    },
    {
      path: '/mobile_login_error',
      name: 'mobile_login_error',
      component: () => import('@/views/static/MobileLoginError.vue'),
    },
    {
      path: '/superpower',
      name: 'superpower',
      component: () => import('@/views/Superpower.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/payment_success',
      name: 'payment_success',
      component: () => import('@/views/static/Payment.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/payment_failure',
      name: 'payment_failure',
      component: () => import('@/views/static/Payment.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/report/*',
      name: 'public_report',
      component: () => import('@/views/PublicReport.vue'),
    },
    {
      path: '/apple_firefox_error',
      name: 'apple_firefox_error',
      component: () => import('@/views/static/AppleFirefoxError.vue'),
    },
    {
      path: '/google_calendar_setup_web',
      name: 'google_calendar_setup_web',
      component: () => import('@/views/static/GoogleCalendarSetup.vue'),
    },
    {
      path: '/invite/*',
      name: 'delegation_invite',
      component: () => import('@/views/delegation/DelegationInvite.vue'),
    },
    {
      path: '*',
      name: 'not_found',
      component: () => import('@/views/static/NotFound.vue'),
    },
  ],
})

router.beforeEach((to, _, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const user = (store as any).state.UserStore.user

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
