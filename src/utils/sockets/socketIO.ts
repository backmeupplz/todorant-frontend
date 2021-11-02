import SocketIO from 'socket.io-client'

export const socketIO = SocketIO(
  !process.env.VUE_APP_DEV ? 'http://localhost:3000' : 'https://ws.todorant.com'
)
