// Dependencies
import Vue from 'vue'
import VueAppleSignin from 'vue-apple-signin'

Vue.use(VueAppleSignin, {
  clientId: process.env.VUE_APP_APPLE_CLIENT_ID,
  scope: 'name email',
  // redirectURI: `${process.env.VUE_APP_API}/apple`,
  redirectURI: `https://cc9ec665.ngrok.io/apple`,
  state: 'nostate',
})
