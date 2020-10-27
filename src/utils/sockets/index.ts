import DelegationStore from '@/store/modules/DelegationStore'
import { User } from '@/models/User'
import { serverBus } from '@/main'
import store from '@/store'
import { socketIO } from '@/utils/sockets/socketIO'
import { PromiseMap } from '@/utils/PromiseMap'
import { SyncManager } from '@/utils/sockets/SyncManager'
import { getModule } from 'vuex-module-decorators'
import { db } from '@/utils/db'

class SocketManager {
  pendingPushes = {} as PromiseMap

  delegateSyncManager: SyncManager<{
    delegates: User[]
    delegators: User[]
    token: string
  }>

  constructor() {
    this.connect()

    socketIO.on('connect', this.onConnect)
    socketIO.on('disconnect', this.onDisconnect)

    socketIO.on('connect_error', this.onConnectError)
    socketIO.on('connect_timeout', this.onConnectTimeout)
    socketIO.on('error', this.onError)

    socketIO.on('authorized', this.onAuthorized)

    socketIO.on(`todos_sync_request`, () => {
      console.log('sockets requested sync')
      serverBus.$emit('refreshRequested')
    })

    this.delegateSyncManager = new SyncManager<{
      delegates: User[]
      delegators: User[]
      token: string
    }>(
      'delegate',
      this.pendingPushes,
      () => undefined,
      async (objects) => {
        // Delegators
        await db.delegators.clear()
        await db.delegators.bulkAdd(objects.delegators)
        // Delegates
        await db.delegates.clear()
        await db.delegates.bulkAdd(objects.delegates)
        // Token
        getModule(DelegationStore, store).setToken(objects.token)
      }
    )
  }

  connect = () => {
    if (socketIO.connected) {
      return
    }
    socketIO.connect()
  }
  authorize = () => {
    if (!(store as any).state.UserStore.user) {
      return
    }
    const token = (store as any).state.UserStore.user.token
    if (
      !token ||
      !socketIO.connected ||
      (store as any).state.SocketsStore.authorized
    ) {
      return
    }
    socketIO.emit('authorize', token)
  }
  logout = () => {
    if (!socketIO.connected) {
      return
    }
    socketIO.emit('logout')
    ;(store as any).state.SocketsStore.authorized = false
    console.log('sockets logout')
  }

  onConnect = () => {
    console.log('sockets connected')
    ;(store as any).state.SocketsStore.connected = true
    this.authorize()
  }
  onDisconnect = () => {
    console.log('sockets disconnected')
    ;(store as any).state.SocketsStore.connected = false
    ;(store as any).state.SocketsStore.authorized = false
  }

  onConnectError = (error: Error) => {
    console.error(error)
  }
  onConnectTimeout = () => {
    console.error('ws connect timeout')
  }
  onError = () => {
    console.error('ws error')
  }

  onAuthorized = () => {
    console.log('sockets authorized')
    ;(store as any).state.SocketsStore.authorized = true
    this.globalSync()
  }

  globalSync = () => {
    this.delegateSyncManager.sync()
  }
}

export const sockets = new SocketManager()
