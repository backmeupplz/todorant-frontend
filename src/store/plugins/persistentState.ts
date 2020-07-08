import createPersistedState from 'vuex-persistedstate'

export default createPersistedState({
  paths: [
    'UserStore.user',
    'AppStore.language',
    'AppStore.dark',
    'AppStore.rulesShown',
    'UserStore.password',
    'AppStore.landingABTestGroup',
    'SettingsStore.audioEnabled',
    'SettingsStore.hotKeysEnabled',
  ],
})
