import { serverBus } from '@/main'
import SocketIO from 'socket.io-client'
import store from '@/store'

const socketIO = SocketIO(
  process.env.VUE_APP_DEV ? 'http://localhost:3000' : 'https://ws.todorant.com'
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
    if (!store.state.UserStore.user) {
      return
    }
    const token = store.state.UserStore.user.token
    if (!token || !socketIO.connected || store.state.SocketsStore.authorized) {
      return
    }
    socketIO.emit('authorize', token)
  }
  logout = () => {
    if (!socketIO.connected) {
      return
    }
    socketIO.emit('logout')
    store.state.SocketsStore.authorized = false
    console.log('sockets logout')
  }

  onConnect = () => {
    console.log('sockets connected')
    store.state.SocketsStore.connected = true
    this.authorize()
  }
  onDisconnect = () => {
    console.log('sockets disconnected')
    store.state.SocketsStore.connected = false
    store.state.SocketsStore.authorized = false
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
    store.state.SocketsStore.authorized = true
  }
}

export const sockets = new SocketManager()
