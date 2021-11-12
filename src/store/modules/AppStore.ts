import { Ref, ref, watch } from '@vue/composition-api'
import { createSharedComposable } from '@vueuse/core'
import { VuexModule, Module, Mutation } from 'vuex-module-decorators'

@Module({ namespaced: true, name: 'AppStore' })
export default class AppStore extends VuexModule {
  language?: string = undefined
  dark = false
  rulesShown = false
  editting = false

  todoDialog = false

  todayDateTitle = ''

  @Mutation
  setLanguage(language: string) {
    this.language = language
  }

  @Mutation
  setDark(dark: boolean) {
    this.dark = dark
  }

  @Mutation
  setRulesShown(rulesShown: boolean) {
    this.rulesShown = rulesShown
  }

  @Mutation
  setEditting(editting: boolean) {
    this.editting = editting
  }

  @Mutation
  setTodayTitle(todayDateTitle: string) {
    this.todayDateTitle = todayDateTitle
  }
}

function useAppHandler() {
  const language: Ref<string | undefined> = ref(undefined)
  const dark = ref(false)
  const rulesShown = ref(false)
  const editting = ref(false)

  const todayDateTitle = ref('')

  function setRulesShown(shown: boolean) {
    rulesShown.value = shown
  }

  function setEditting(newEditting: boolean) {
    editting.value = newEditting
  }

  function setDark(newDark: boolean) {
    dark.value = newDark
  }

  function setLanauge(newLanguage: string) {
    language.value = newLanguage
  }

  function setTodayTitle(title: string) {
    todayDateTitle.value = title
  }

  return {
    language,
    dark,
    rulesShown,
    editting,
    todayDateTitle,
    setTodayTitle,
    setLanauge,
    setDark,
    setEditting,
    setRulesShown,
  }
}

export const useApp = createSharedComposable(useAppHandler)

function useStoredRef<T>(def: T, key: string) {
  const innerRef = ref(def) // initialize a ref with the default value
  const cachedValue = localStorage.getItem(key)
  if (cachedValue) {
    // if there is a cached value, deserialize it and assign it to the ref
    innerRef.value = JSON.parse(cachedValue)
  }

  watch(
    innerRef,
    (newVal) => {
      // Serialize the new value and store it in local storage
      localStorage.setItem(key, JSON.stringify(newVal))
    },
    {
      deep: true,
    }
  )

  return innerRef
}
