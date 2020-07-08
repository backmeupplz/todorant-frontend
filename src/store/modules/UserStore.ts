import { User } from '@/models/User'
import { VuexModule, Module, Mutation } from 'vuex-module-decorators'
import { SubscriptionStatus } from '@/models/SubscriptionStatus'

@Module({ namespaced: true, name: 'UserStore' })
export default class UserStore extends VuexModule {
  user?: User = undefined

  planning = false
  subscriptionStatus = SubscriptionStatus.active
  createdAt = new Date()
  subscriptionIdExists = false

  password?: String = undefined

  @Mutation
  setUser(user: User): void {
    this.user = user
  }

  @Mutation
  setUserStore(userStore: UserStore): void {
    Object.assign(this, userStore)
  }

  @Mutation
  setPassword(password?: string) {
    this.password = password
  }
}
