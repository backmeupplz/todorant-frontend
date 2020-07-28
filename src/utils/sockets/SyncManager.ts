import events from 'events'
import { socketIO } from '@/utils/sockets/socketIO'
import { v4 as uuid } from 'uuid'
import store from '@/store'
import { PromiseMap } from '@/utils/PromiseMap'

export const syncEventEmitter = new events.EventEmitter()

export class SyncManager<T> {
  name: string
  pendingPushes: PromiseMap
  latestSyncDate: () => Date | undefined
  onObjectsFromServer: (
    objects: T,
    pushBack: (objects: T) => Promise<T>
  ) => Promise<void>

  // 0
  constructor(
    name: string,
    pendingPushes: PromiseMap,
    latestSyncDate: () => Date | undefined,
    onObjectsFromServer: (
      objects: T,
      pushBack: (objects: T) => Promise<T>
    ) => Promise<void>,
    setLastSyncDate?: (latestSyncDate: Date) => void
  ) {
    this.name = name
    this.pendingPushes = pendingPushes
    this.latestSyncDate = latestSyncDate
    this.onObjectsFromServer = onObjectsFromServer

    // -1
    socketIO.on(`${name}_sync_request`, () => {
      console.log(`${this.name}: sync_request`)
      this.sync()
    })

    // 2
    socketIO.on(name, async (response: T) => {
      console.log(
        `${this.name}: onObjectsFromServer`,
        Array.isArray(response) ? response.length : 1
      )
      try {
        await onObjectsFromServer(response, this.pushObjects)
      } catch (err) {
        console.log(err)
        syncEventEmitter.emit(`${name}_sync_errored`, err)
      }
    })
    // 4
    socketIO.on(`${name}_pushed`, (pushId: string, objects: T) => {
      console.log(
        `${this.name}: pushed`,
        Array.isArray(objects) ? objects.length : 1
      )
      this.pendingPushes[pushId]?.res(objects)
      delete this.pendingPushes[pushId]
      if (setLastSyncDate) {
        setLastSyncDate(new Date())
      }
      syncEventEmitter.emit(`${name}_synced`)
    })
    // 4
    socketIO.on(`${name}_pushed_error`, (pushId: string, error: Error) => {
      console.log(`${this.name}: pushed_error`, pushId, error)
      this.pendingPushes[pushId]?.rej(error)
      delete this.pendingPushes[pushId]
      syncEventEmitter.emit(`${name}_sync_errored`, error)
    })
  }

  // 1
  sync = async () => {
    if (!store.state.UserStore.user.token || !socketIO.connected) {
      return
    }
    console.log(`${this.name}: sync`, this.latestSyncDate())
    socketIO.emit(`sync_${this.name}`, this.latestSyncDate())
  }

  // 3
  private pushObjects = (objects: T): Promise<T> => {
    return new Promise<T>((res, rej) => {
      const pushId = uuid()
      this.pendingPushes[pushId] = { res, rej }
      console.log(
        `${this.name}: pushObjects`,
        pushId,
        Array.isArray(objects) ? objects.length : 1
      )
      socketIO.emit(
        `push_${this.name}`,
        pushId,
        objects,
        store.state.UserStore.user.password
      )
    })
  }
}
