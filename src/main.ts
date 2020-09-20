import Vue from 'vue'
import store from '@/store'
import './plugins/firebase'
import './plugins/apple'
import './plugins/vue-meta'
import App from './App.vue'
import router from './plugins/router'
import { i18n } from './plugins/i18n'
import './plugins/shortkey'
import './plugins/vue-flag-icon'
import './plugins/visibility'
import './plugins/confetti'
import './plugins/vue-clipboard2'
import vuetify from './plugins/vuetify'
import { setupHooks } from '@/store/hooks'

Vue.config.productionTip = true

export const serverBus = new Vue()

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')

setupHooks()

import './utils/sockets'
