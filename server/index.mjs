import { v4 } from 'uuid'
import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000'
  }
})

io.of('/room1').on('connect', socket => {
  console.log('socket: ', socket.id, ' connected')

  socket.on('disconnect', () => {
    console.log('socket: ', socket.id, ' disconnected')
  })
})


io.on('new_namespace', namespace => {
  console.log('new namespace was created')
})

httpServer.listen(5000, () => {
  console.log('Listening to 5000 bilya') 
})