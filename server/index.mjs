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


io.on('connect', async(socket) => {
  socket.on('create player', name  => {
    socket.name = name
    console.log(socket.id)
  })

  socket.on('join room', async(room, callback) => {
    const sockets = await io.in(room).fetchSockets()
    if (sockets.length === 2) {
      io.to(room).emit('full')
      callback(sockets.length)
      return
    }
    socket.room = room
    socket.join(room)
    io.to(room).emit('joined', room, true)
    callback(sockets.length + 1)
  })

  socket.on('leave room', room => {
    socket.room = undefined
    io.to(room).emit('left', null, false)
    socket.leave(room)
    console.log(socket.name)
  })

  socket.on('tag cell', ({stage, tCount}) => {
    io.to(`${socket.room}`).emit('get tagged', stage, tCount)
  })

  socket.on('restart game', () => {
    io.to(`${socket.room}`).emit('restart')
  })


  socket.on('disconnect', () => {
    console.log(`${socket.name} logged out`)
  })
}) 






httpServer.listen(5000, () => {
  console.log('Listening to 5000 bilya') 
})