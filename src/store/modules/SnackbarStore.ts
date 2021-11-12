import { LocalizedError } from '@/models/LocalizedError'
import { VuexModule, Module, Mutation } from 'vuex-module-decorators'

import { createSharedComposable, useMouse } from '@vueuse/core'
import { Ref, ref } from '@vue/composition-api'

export function useSnackbar() {
  const message = ref('')
  const active = ref(false)
  const color: Ref<'success' | 'error'> = ref('success')

  function hideBar() {
    message.value = ''
    active.value = false
    color.value = 'success'
  }

  function setSnackbarError(error: string) {
    message.value = error
    active.value = true
    color.value = 'error'
  }

  return {
    message,
    active,
    color,
    hideBar,
    setSnackbarError,
  }
}

@Module({ namespaced: true, name: 'SnackbarStore' })
export default class SnackbarStore extends VuexModule {
  message: String | LocalizedError = ''
  active: boolean = false
  color: String = 'success'

  @Mutation
  setSnackbar(snackbarStore: SnackbarStore) {
    Object.assign(this, snackbarStore)
  }

  @Mutation
  setActive(active: boolean) {
    this.active = active
  }

  @Mutation
  setSnackbarError(error: string) {
    this.message = error
    this.active = true
    this.color = 'error'
  }

  @Mutation
  setSnackbarSuccess(message: string) {
    this.message = message
    this.active = true
    this.color = 'success'
  }

  @Mutation
  hideSnackbar() {
    this.active = false
  }
}
