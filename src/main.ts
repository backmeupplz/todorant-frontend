import Vue from 'vue'
import './plugins/facebook'
import './plugins/google'
import './plugins/apple'
import './plugins/vue-meta'
import App from './App.vue'
import router from './plugins/router'
import { store } from './plugins/store'
import { i18n } from './plugins/i18n'
import './plugins/shortkey'
import './plugins/vue-flag-icon'
import './plugins/visibility'
import './plugins/confetti'
import './plugins/vue-clipboard2'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = true

export const serverBus = new Vue()

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')

import './utils/sockets'
