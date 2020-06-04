// Dependencies
import Vue from 'vue'
import Vuex from 'vuex'
import { User } from '../models/user'
import { Tag } from '../models/tag'
import createPersistedState from 'vuex-persistedstate'
import { daysBetween } from '../utils/daysBetween'
import { setFavIcon } from '../utils/setFavIcon'
import { setUserProperty } from '../utils/logEvent'

Vue.use(Vuex)

export interface State {
  user?: User
  snackbar: SnackbarState
  language?: String
  dark: Boolean
  userState: UserState
  rulesShown: Boolean
  editting: Boolean
  sockets: Sockets
  tags: Tag[]
  tagColors: { [index: string]: string }
  password?: String

  landingABTestGroup: Number
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

export interface GoogleCalendarCredentials {
  refresh_token?: string | null
  expiry_date?: number | null
  access_token?: string | null
  token_type?: string | null
  id_token?: string | null
}

export interface Settings {
  showTodayOnAddTodo?: boolean
  firstDayOfWeek?: number
  newTodosGoFirst?: boolean
  preserveOrderByTime?: boolean
  googleCalendarCredentials?: GoogleCalendarCredentials
}

export interface UserState {
  planning: Boolean
  subscriptionStatus: SubscriptionStatus
  createdAt: Date
  subscriptionIdExists: Boolean
  settings: Settings
}

interface Sockets {
  authorized: Boolean
  connected: Boolean
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
      subscriptionStatus: SubscriptionStatus.active,
      createdAt: new Date(),
      subscriptionIdExists: false,
      settings: {},
    },
    rulesShown: false,
    editting: false,
    sockets: {
      authorized: false,
      connected: false,
    },
    tags: [],
    tagColors: {},
    password: undefined,
    landingABTestGroup: Math.floor(Math.random() * 2),
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
      setUserProperty('language', language)
      state.language = language
    },
    setDark(state: State, dark: Boolean) {
      setUserProperty('darkMode', dark)
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
    setSockets(state: State, sockets: Sockets) {
      state.sockets = sockets
    },
    setTags(state: State, tags: Tag[]) {
      state.tags = tags
    },
    setTagColors(state: State, tagColors: { [index: string]: string }) {
      state.tagColors = tagColors
    },
    setPassword(state: State, password: string | undefined) {
      state.password = password
    },
    setLandingABTestGroup(state: State, landingABTestGroup: number) {
      state.landingABTestGroup = landingABTestGroup
      setUserProperty('landingABTestGroup', landingABTestGroup)
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
    sockets: (state: State) => state.sockets,
    tags: (state: State) => state.tags,
    tagColors: (state: State) => state.tagColors,
    password: (state: State) => state.password,
    landingABTestGroup: (state: State) => state.landingABTestGroup,
  },
  plugins: [
    createPersistedState({
      paths: [
        'user',
        'language',
        'dark',
        'rulesShown',
        'password',
        'landingABTestGroup',
      ],
    }),
  ],
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
export const sockets = () => getters.sockets as Sockets
export const tags = () => getters.tags as Tag[]
export const tagColors = () => getters.tagColors as { [index: string]: string }
export const password = () => getters.password as string | undefined
export const landingABTestGroup = () => getters.landingABTestGroup as number

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
export const setSnackbarSuccess = (message: String) => {
  setSnackbar({
    message,
    color: 'success',
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

  setFavIcon(dark)

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
export const setSockets = (sockets: Sockets) => {
  store.commit('setSockets', sockets)
}
export const setTags = (tags: Tag[]) => {
  store.commit('setTags', tags)
}
export const setTagColors = (tagColors: { [index: string]: string }) => {
  store.commit('setTagColors', tagColors)
}
export const setPassword = (password: string | undefined) => {
  store.commit('setPassword', password)
}

setUserProperty('landingABTestGroup', landingABTestGroup())
setUserProperty('language', language())
setUserProperty('darkMode', dark())
