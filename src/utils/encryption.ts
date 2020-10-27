import { AES, enc } from 'crypto-js'
import store from '@/store'

export function encrypt(str: string) {
  if (!(store as any).state.UserStore.password) {
    return str
  } else {
    return _e(str, (store as any).state.UserStore.password as string)
  }
}

export function decrypt(str: string, encrypted = false) {
  if (!(store as any).state.UserStore.password && !encrypted) {
    return str
  } else {
    return !(store as any).state.UserStore.password
      ? ''
      : _d(str, (store as any).state.UserStore.password as string)
  }
}

export function _e(value: string, key: string) {
  return AES.encrypt(value, key).toString()
}

export function _d(value: string, key: string) {
  const bytes = AES.decrypt(value, key)
  return bytes.toString(enc.Utf8)
}
