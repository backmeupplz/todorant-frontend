// Dependencies
import Vue from 'vue'
import VueAppleSignin from 'vue-apple-signin'

Vue.use(VueAppleSignin, {
  clientId: import.meta.env.VITE_VUE_APP_APPLE_CLIENT_ID,
  scope: 'name email',
  redirectURI: `${import.meta.env.VITE_VUE_APP_API}/apple`,
  state: 'nostate',
})
