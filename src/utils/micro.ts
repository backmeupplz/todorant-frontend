import store from '@/store'
import axios from 'axios'

export function logEventToMicro(name: string) {
  const user = (store as any).state.UserStore.user
  const settings = (store as any).state.SettingsStore
  if (!user) {
    return
  }

  return axios.post('https://micro.todorant.com', {
    userId: user._id,
    name,
    timestamp: Date.now(),
    platform: 'web',
    language: settings.language || 'unknown',
    userAgent: navigator.userAgent,
    debug: process.env.VUE_APP_DEV ? true : undefined,
    density: window.devicePixelRatio,
  })
}
