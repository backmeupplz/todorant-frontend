import { VuexModule, Module, Mutation } from 'vuex-module-decorators'

@Module({ namespaced: true, name: 'SocketsStore' })
export default class SocketsStore extends VuexModule {
  authorized = false
  connected = false
  connectionError?: Error

  @Mutation
  setAuthorized(authorized: boolean) {
    this.authorized = authorized
  }

  @Mutation
  setConnected(connected: boolean) {
    this.connected = connected
  }

  @Mutation
  setСonnectionError(connectionError?: Error) {
    this.connectionError = connectionError
  }
}
