import { Tag } from '@/models/Tag'
import { socketIO } from '@/utils/sockets/socketIO'
import { SyncManager } from '@/utils/sockets/SyncManager'
import store from '@/store'
import UserStore from '@/store/modules/UserStore'
import SocketsStore from '@/store/modules/SocketsStore'

const userStore = store.state.UserStore as UserStore
const socketsStore = store.state.SocketsStore as SocketsStore

class SocketManager {
  tagsSyncManager: SyncManager<Tag[]>
  delegationSyncManager: SyncManager<any>

  pendingAuthorization?: {
    res: () => void
    rej: (reason: string) => void
    createdAt: number
  }

  get isSyncing() {
    return (
      this.tagsSyncManager.isSyncing || this.delegationSyncManager.isSyncing
    )
  }

  constructor() {
    this.connect()

    socketIO.on('connect', this.onConnect)
    socketIO.on('disconnect', this.onDisconnect)

    socketIO.on('connect_error', this.onConnectError)
    socketIO.on('connect_timeout', this.onConnectTimeout)
    socketIO.on('error', this.onError)

    socketIO.on('authorized', this.onAuthorized)

    this.tagsSyncManager = new SyncManager<Tag[]>(
      'tags',
      () => sharedTagStore.lastSyncDate,
      (objects, pushBack, completeSync) => {
        return sharedTagStore.onObjectsFromServer(
          objects,
          pushBack as () => Promise<Tag[]>,
          completeSync
        )
      },
      (lastSyncDate) => {
        sharedTagStore.lastSyncDate = new Date(lastSyncDate)
      }
    )
    this.delegationSyncManager = new SyncManager<any>(
      'delegate',
      () => undefined,
      (objects, _, completeSync) => {
        return sharedDelegationStore.onObjectsFromServer(objects, completeSync)
      }
    )

    // Check authorization promise timeout
    setInterval(() => {
      if (!this.pendingAuthorization) {
        return
      }
      const timeout = 20
      if (Date.now() - this.pendingAuthorization.createdAt > timeout * 1000) {
        this.pendingAuthorization.rej('Operation timed out')
        this.pendingAuthorization = undefined
      }
    }, 1000)

    // Check connection (if not dev)
    setInterval(() => {
      this.connect()
    }, 1000)
  }

  connect = () => {
    if (socketIO.connected) {
      return
    }
    try {
      socketIO.connect()
    } catch (err) {
      console.warn('Socket connection error', err)
    }
  }
  authorize = () => {
    return new Promise((res, rej) => {
      if (!userStore.user?.token || !socketIO.connected) {
        return rej('Not connected to sockets')
      }
      if (socketsStore.authorized) {
        return res()
      }
      this.pendingAuthorization = { res, rej, createdAt: Date.now() }
      socketIO.emit('authorize', userStore.user.token, '1')
    })
  }
  logout = () => {
    if (!socketIO.connected) {
      return
    }
    socketIO.emit('logout')
    socketsStore.setAuthorized(false)
  }

  onConnect = () => {
    socketsStore.setConnected(true)
    socketsStore.setСonnectionError(undefined)
    this.authorize()
  }
  onDisconnect = () => {
    socketsStore.setConnected(false)
    socketsStore.setAuthorized(false)
    this.connect()
  }

  onConnectError = (error: Error) => {
    socketsStore.setСonnectionError(error)
  }
  onConnectTimeout = () => {
    console.warn('ws connect timeout')
  }
  onError = (err: any) => {
    console.warn('ws error', err)
  }

  onAuthorized = () => {
    socketsStore.setAuthorized(true)
    this.pendingAuthorization?.res()
    this.pendingAuthorization = undefined
  }

  globalSync = () => {
    return Promise.all([
      this.tagsSyncManager.sync(),
      this.delegationSyncManager.sync(),
    ])
  }
}

export const sockets = new SocketManager()
