import { User } from '@/models/User'
import { socketIO } from '@/utils/sockets/socketIO'
import { SyncManager } from '@/utils/sockets/SyncManager'
import store from '@/store'
import SocketsStore from '@/store/modules/SocketsStore'
import DelegationStore from '@/store/modules/DelegationStore'
import { serverBus } from '@/main'
import { getModule } from 'vuex-module-decorators'
import { Todo } from '@/models/Todo'
import { db } from '@/utils/db'
import { Tag } from '@/models/Tag'
import TodosStore from '@/store/modules/TodosStore'
import TagsStore from '@/store/modules/TagsStore'
import SettingsStore from '@/store/modules/SettingsStore'
import AppStore from '@/store/modules/AppStore'
import UserStore from '@/store/modules/UserStore'

const socketsStore = getModule(SocketsStore, store)
const delegationStore = getModule(DelegationStore, store)

class SocketManager {
  delegationSyncManager: SyncManager<{
    delegates: User[]
    delegators: User[]
    token: string
  }>

  settingsSyncManager: SyncManager<AppStore & UserStore>
  todoSyncManager: SyncManager<Todo[]>
  tagSyncManager: SyncManager<Tag[]>

  pendingAuthorization?: {
    res: () => void
    rej: (reason: string) => void
    createdAt: number
  }

  get isSyncing() {
    return this.delegationSyncManager.isSyncing
  }

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

    this.todoSyncManager = new SyncManager<Todo[]>(
      'todos',
      () => undefined,
      (objects, pushBack, completeSync) => {
        return getModule(TodosStore, store).onObjectFromServer({
          objects,
          pushBack,
          completeSync,
        })
      },
      (lastSyncDate) => {
        if (socketsStore.connected && socketsStore.authorized) {
          getModule(TodosStore, store).setLastSyncDate(lastSyncDate)
        }
      }
    )
    this.tagSyncManager = new SyncManager<Tag[]>(
      'tags',
      () => undefined,
      (objects, pushBack, completeSync) => {
        return getModule(TagsStore, store).onObjectFromServer({
          objects,
          pushBack,
          completeSync,
        })
      },
      (lastSyncDate) => {
        getModule(TagsStore, store).lastSyncDate = new Date(lastSyncDate)
      }
    )

    this.settingsSyncManager = new SyncManager<any>(
      'settings',
      () => undefined,
      (objects, pushBack, completeSync) => {
        getModule(SettingsStore, store).setSettingsStore(objects)
        getModule(AppStore, store).setLanguage(objects.language)
        completeSync()
        return new Promise(() => {})
      }
    )

    this.delegationSyncManager = new SyncManager<any>(
      'delegate',
      () => undefined,
      (objects, _, completeSync) => {
        return delegationStore.onObjectsFromServer(objects, completeSync)
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
    return new Promise<void>((res, rej) => {
      if (!(store as any).state.UserStore.user?.token || !socketIO.connected) {
        return rej('Not connected to sockets')
      }
      if (socketsStore.authorized) {
        return res()
      }
      this.pendingAuthorization = { res, rej, createdAt: Date.now() }
      socketIO.emit(
        'authorize',
        (store as any).state.UserStore.user?.token,
        '1'
      )
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
    this.todoSyncManager.sync()
    this.settingsSyncManager.sync()
    this.tagSyncManager.sync()
  }

  globalSync = () => {
    return Promise.all([this.delegationSyncManager.sync()])
  }
}

export const sockets = new SocketManager()
