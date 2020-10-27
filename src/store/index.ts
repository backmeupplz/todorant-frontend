import AppStore from '@/store/modules/AppStore'
import SettingsStore from '@/store/modules/SettingsStore'
import UserStore from '@/store/modules/UserStore'
import SnackbarStore from '@/store/modules/SnackbarStore'
import TagsStore from '@/store/modules/TagsStore'
import SocketsStore from '@/store/modules/SocketsStore'
import HeroStore from '@/store/modules/HeroStore'
import DelegationStore from '@/store/modules/DelegationStore'
import persistentState from '@/store/plugins/persistentState'
import Vue from 'vue'
import Vuex from 'vuex'
import { setUserProperty } from '@/utils/logEvent'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    AppStore,
    SettingsStore,
    SnackbarStore,
    SocketsStore,
    TagsStore,
    UserStore,
    HeroStore,
    DelegationStore,
  },
  plugins: [persistentState],
})

// Setup analytics
setUserProperty(
  'landingABTestGroup',
  (store as any).state.AppStore.landingABTestGroup
)
setUserProperty('language', (store as any).state.AppStore.language)
setUserProperty('darkMode', (store as any).state.AppStore.dark)

export default store
