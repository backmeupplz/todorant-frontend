import SocketIO from 'socket.io-client'

export const socketIO = SocketIO(
  process.env.VUE_APP_DEV ? 'http://localhost:3000' : 'https://ws.todorant.com',
  {
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 30000,
  }
)
