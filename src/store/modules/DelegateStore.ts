import { User } from '@/models/User'
import { VuexModule, Module, Mutation } from 'vuex-module-decorators'

@Module({ namespaced: true, name: 'DelegateStore' })
export default class DelegateStore extends VuexModule {
  delegates: User[] = []
  delegators: User[] = []
  token?: string = undefined

  @Mutation
  setDelegates(delegates: User[]) {
    this.delegates = delegates
  }

  @Mutation
  setDelegators(delegators: User[]) {
    this.delegators = delegators
  }

  @Mutation
  setToken(token: string) {
    this.token = token
  }

  get delegateInviteLink() {
    return `${process.env.VUE_APP_WEBSITE}/invite/${this.token}`
  }
}
