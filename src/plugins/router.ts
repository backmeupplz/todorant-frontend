import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
// We are using these strange imports because of lazy loading with vue-class-components
const Home = (resolve: any) => (require as any)(['@/views/Home.vue'], resolve)
const Superpower = (resolve: any) =>
  (require as any)(['@/views/Superpower.vue'], resolve)
const NotFound = (resolve: any) =>
  (require as any)(['@/views/static/NotFound.vue'], resolve)
const Privacy = (resolve: any) =>
  (require as any)(['@/views/static/Privacy.vue'], resolve)
const Terms = (resolve: any) =>
  (require as any)(['@/views/static/Terms.vue'], resolve)
const Payment = (resolve: any) =>
  (require as any)(['@/views/static/Payment.vue'], resolve)
const LoginTelegram = (resolve: any) =>
  (require as any)(['@/views/LoginTelegram.vue'], resolve)
const MobileLoginSuccess = (resolve: any) =>
  (require as any)(['@/views/static/MobileLoginSuccess.vue'], resolve)
const MobileLoginError = (resolve: any) =>
  (require as any)(['@/views/static/MobileLoginError.vue'], resolve)
const PublicReport = (resolve: any) =>
  (require as any)(['@/views/PublicReport.vue'], resolve)
const AppleFirefoxError = (resolve: any) =>
  (require as any)(['@/views/static/AppleFirefoxError.vue'], resolve)
const GoogleCalendarSetup = (resolve: any) =>
  (require as any)(['@/views/static/GoogleCalendarSetup.vue'], resolve)
const DelegationInvite = (resolve: any) =>
  (require as any)(['@/views/delegation/DelegationInvite.vue'], resolve)

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      alias: [
        '/facebook_login_result',
        '/google_login_result',
        '/apple_login_result',
      ],
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
      name: 'delegation_invite',
      component: DelegationInvite,
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
