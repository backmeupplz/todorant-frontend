import { User } from '@/models/User'
import {
  VuexModule,
  Module,
  MutationAction,
  Mutation,
  Action,
} from 'vuex-module-decorators'
import * as api from '@/utils/api'
import { db } from '@/utils/db'

@Module({ namespaced: true, name: 'DelegationStore' })
export default class DelegationStore extends VuexModule {
  delegates: User[] = []
  delegators: User[] = []
  token = ''

  @Mutation
  setToken(token: string) {
    this.token = token
  }

  @MutationAction({ mutate: ['token'] })
  async resetDelegateToken() {
    const token = await api.resetDelegateToken()
    return { token }
  }

  @MutationAction({ mutate: ['delegates'] })
  async fetchDelegates() {
    return {
      delegates: await db.delegates.toArray(),
    }
  }

  @MutationAction({ mutate: ['delegators'] })
  async fetchDelegators() {
    return {
      delegators: await db.delegators.toArray(),
    }
  }

  @Action
  async deleteDelegate(id: string) {
    await api.deleteDelegate(id)
    await db.delegates.delete(id)
  }

  @Action
  async deleteDelegator(id: string) {
    await api.deleteDelegator(id)
    await db.delegators.delete(id)
  }

  get delegateInviteLink() {
    return `${process.env.VUE_APP_WEBSITE}/invite/${this.token}`
  }
}