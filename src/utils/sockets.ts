import { serverBus } from '../main';
import SocketIO from 'socket.io-client'
import * as store from '../plugins/store'

const socketIO = SocketIO(
  process.env.VUE_APP_DEV ? 'http://192.168.31.27:3000' : 'https://ws.todorant.com'
)

class SocketManager {
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
  }

  connect = () => {
    if (socketIO.connected) {
      return
    }
    socketIO.connect()
  }
  authorize = () => {
    const token = store.user()?.token
    if (
      !token ||
      !socketIO.connected ||
      store.sockets().authorized
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
    store.sockets().authorized = false
    console.log('sockets logout')
  }

  onConnect = () => {
    console.log('sockets connected')
    store.sockets().connected = true
    this.authorize()
  }
  onDisconnect = () => {
    console.log('sockets disconnected')
    store.sockets().connected = false
    store.sockets().authorized = false
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
    store.sockets().authorized = true
  }
}

export const sockets = new SocketManager()
