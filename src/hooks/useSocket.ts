import { io } from 'socket.io-client'

const useSocket = (room: string) => {
  const socket = io('http://localhost:5000')

  return { socket }
}

export default useSocket
// kak delat' ebuchie komnati i vivodit' ih