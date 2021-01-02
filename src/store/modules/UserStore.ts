import { User } from '@/models/User'
import { VuexModule, Module, Mutation } from 'vuex-module-decorators'
import { SubscriptionStatus } from '@/models/SubscriptionStatus'
import { setCookie } from '@/utils/cookie'

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
  setPlanning(planning: boolean) {
    this.planning = planning
  }

  @Mutation
  setUserStore(userStore: UserStore): void {
    Object.assign(this, userStore)
  }

  @Mutation
  setPassword(password?: string) {
    setCookie('password', password!)
    this.password = password
  }

  @Mutation
  setUserName(name: string): void {
    if (!this.user) return
    this.user.name = name
  }

  @Mutation
  setTelegramId(telegramId: string): void {
    if (!this.user) return
    this.user.telegramId = telegramId
  }
}
