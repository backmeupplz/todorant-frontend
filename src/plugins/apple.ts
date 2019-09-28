// Dependencies
import Vue from 'vue'

Vue.use(require('vue-apple-signin'), {
  clientId: process.env.VUE_APP_APPLE_CLIENT_ID,
  scope: '["name", "email"]',
  redirectURI: process.env.VUE_APP_WEBSITE,
})
