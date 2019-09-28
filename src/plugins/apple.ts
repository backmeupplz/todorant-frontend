// Dependencies
import Vue from 'vue'
import VueAppleSignin from 'vue-apple-signin'

Vue.use(VueAppleSignin, {
  clientId: process.env.VUE_APP_APPLE_CLIENT_ID,
  scope: 'name email',
  redirectURI: process.env.VUE_APP_WEBSITE,
  state: 'nostate',
})
