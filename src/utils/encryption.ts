import { AES, enc } from 'crypto-js'
import * as store from '../plugins/store'

export function encrypt(str: string) {
  if (!store.password()) {
    return str
  } else {
    return _e(str, store.password() as string)
  }
}

export function decrypt(str: string, encrypted = false) {
  if (!store.password() && !encrypted) {
    return str
  } else {
    return !store.password() ? '' : _d(str, store.password() as string)
  }
}

export function _e(value: string, key: string) {
  return AES.encrypt(value, key).toString()
}

export function _d(value: string, key: string) {
  const bytes = AES.decrypt(value, key)
  return bytes.toString(enc.Utf8)
}
