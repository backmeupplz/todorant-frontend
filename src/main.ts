import { createApp, h } from '@vue/composition-api'
import { create } from 'domain'
import Vue from 'vue'
import store from '@/store'
// import './plugins/apple'
// import './plugins/vue-meta'
import App from './App.vue'
import router from './plugins/router'
import { i18n } from './plugins/i18n'
// import './plugins/shortkey'
// import './plugins/vue-flag-icon'
// import './plugins/visibility'
// import './plugins/confetti'
// import './plugins/vue-clipboard2'
// import './plugins/vue-plugin-load-script'
// import './plugins/v-hotkey'
// import vuetify from './plugins/vuetify'
// import { setupHooks } from '@/store/hooks'
import VCA from '@vue/composition-api'
import vuetify from './plugins/vuetify'

Vue.use(VCA)

Vue.config.productionTip = true

export const serverBus = new Vue()

const app = createApp({
  router,
  store,
  vuetify,
  i18n,
  render: () => h(App),
})

// new Vue({
//   // router,
//   // store,
//   // i18n,
//   // vuetify,
//   render: (h) => h(App),
// }).$mount('#app')

app.mount('#app')

// setupHooks()

// import './utils/sockets'
