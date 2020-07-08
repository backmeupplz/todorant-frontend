import { VuexModule, Module, Mutation } from 'vuex-module-decorators'

@Module({ namespaced: true, name: 'SocketsStore' })
export default class SocketsStore extends VuexModule {
  authorized = false
  connected = false

  @Mutation
  setAuthorized(authorized: boolean) {
    this.authorized = authorized
  }

  @Mutation
  setConnected(connected: boolean) {
    this.connected = connected
  }
}
