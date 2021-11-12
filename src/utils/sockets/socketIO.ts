import SocketIO from 'socket.io-client'

export const socketIO = SocketIO(
  import.meta.env.VITE_VUE_APP_DEV
    ? 'http://localhost:3000'
    : 'https://ws.todorant.com'
)
