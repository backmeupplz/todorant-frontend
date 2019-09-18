// Dependencies
import Vue from 'vue'
import Vuex from 'vuex'
import { User } from '../models/user'
import createPersistedState from 'vuex-persistedstate'
import { daysBetween } from '@/utils/daysBetween'

Vue.use(Vuex)

export interface State {
  user?: User
  snackbar: SnackbarState
  language?: String
  dark: Boolean
  userState: UserState
  rulesShown: Boolean
  editting: Boolean
}

interface LocalizedError {
  en: string
  ru: string
}

interface SnackbarState {
  message: String | LocalizedError
  active: Boolean
  color: String
}

export enum SubscriptionStatus {
  earlyAdopter = 'earlyAdopter',
  active = 'active',
  trial = 'trial',
  inactive = 'inactive',
}

export interface Settings {
  showTodayOnAddTodo?: boolean
}

export interface UserState {
  planning: Boolean
  subscriptionStatus: SubscriptionStatus
  createdAt: Date
  subscriptionIdExists: Boolean
  settings: Settings
}

const storeOptions = {
  state: {
    user: undefined,
    snackbar: {
      message: '',
      active: false,
      color: 'success',
    },
    language: undefined,
    dark: false,
    userState: {
      planning: false,
      subscriptionStatus: SubscriptionStatus.inactive,
      createdAt: new Date(),
      subscriptionIdExists: false,
      settings: {},
    },
    rulesShown: false,
    editting: false,
  },
  mutations: {
    setUser(state: State, user: User) {
      state.user = user
    },
    logout(state: State) {
      state.user = undefined
    },
    setSnackbar(state: State, snackbar: SnackbarState) {
      state.snackbar = snackbar
    },
    setLanguage(state: State, language: String) {
      state.language = language
    },
    setDark(state: State, dark: Boolean) {
      state.dark = dark
    },
    setUserState(state: State, userState: UserState) {
      state.userState = userState
    },
    setRulesShown(state: State, rulesShown: Boolean) {
      state.rulesShown = rulesShown
    },
    setEditting(state: State, editting: Boolean) {
      state.editting = editting
    },
  },
  getters: {
    user: (state: State) => state.user,
    snackbar: (state: State) => state.snackbar,
    language: (state: State) => state.language,
    dark: (state: State) => state.dark,
    userState: (state: State) => state.userState,
    rulesShown: (state: State) => state.rulesShown,
    editting: (state: State) => state.editting,
  },
  plugins: [createPersistedState()],
}

export const store = new Vuex.Store<State>(storeOptions)

// Getters
const getters = store.getters

export const user = () => getters.user as User | undefined
export const snackbar = () => getters.snackbar as SnackbarState
export const language = () => getters.language as string | undefined
export const dark = () => getters.dark as boolean
export const userState = () => getters.userState as UserState
export const rulesShown = () => getters.rulesShown as Boolean
export const editting = () => getters.editting as Boolean

// Mutations
export const setUser = (user: User) => {
  store.commit('setUser', user)
}
export const setSnackbar = (snackbar: SnackbarState) => {
  store.commit('setSnackbar', snackbar)
}
export const setSnackbarError = (message: String) => {
  setSnackbar({
    message,
    color: 'error',
    active: true,
  })
}
export const hideSnackbar = () => {
  store.commit('setSnackbar', { ...store.state.snackbar, active: false })
}
export const setLanguage = (language: String) => {
  store.commit('setLanguage', language)
}
export const setDark = (dark: Boolean) => {
  ;(document as any)
    .querySelector('meta[name="theme-color"]')
    .setAttribute('content', dark ? '#303030' : '#fafafa')
  store.commit('setDark', dark)
}
export const setUserState = (userState: UserState) => {
  userState.createdAt = new Date(userState.createdAt)
  if (
    userState.subscriptionStatus === SubscriptionStatus.trial &&
    daysBetween(userState.createdAt, new Date()) > 30
  ) {
    userState.subscriptionStatus = SubscriptionStatus.inactive
  }
  store.commit('setUserState', userState)
}
export const logout = () => {
  store.commit('logout')
}
export const setRulesShown = (rulesShown: Boolean) => {
  store.commit('setRulesShown', rulesShown)
}
export const setEditting = (editting: Boolean) => {
  store.commit('setEditting', editting)
}
