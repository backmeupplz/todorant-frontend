import AppStore from '@/store/modules/AppStore'
import SettingsStore from '@/store/modules/SettingsStore'
import UserStore from '@/store/modules/UserStore'
import SnackbarStore from '@/store/modules/SnackbarStore'
import TagsStore from '@/store/modules/TagsStore'
import SocketsStore from '@/store/modules/SocketsStore'
import HeroStore from '@/store/modules/HeroStore'
import DelegateStore from '@/store/modules/DelegateStore'
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
    DelegateStore,
  },
  plugins: [persistentState],
})

export default store

setUserProperty('landingABTestGroup', store.state.AppStore.landingABTestGroup)
setUserProperty('language', store.state.AppStore.language)
setUserProperty('darkMode', store.state.AppStore.dark)
