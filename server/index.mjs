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

  socket.on('socket connected', () => {
    if (io.allRooms) {
      io.emit('get info', io.allRooms)
    }
  })

  socket.on('create player', name  => {
    socket.name = name
    console.log(socket.id, ' 24')
  })

  socket.on('join room', async(room) => {
    socket.room = room
    socket.join(room)

    const sockets = await io.in(room).fetchSockets()

    io.to(room).emit('joined', room, true)
    io.emit('get sockets', room, sockets.length)
  })

  socket.on('leave room', async({room, id}) => {
    socket.room = undefined
    io.to(room).emit('left', null, false, id)
    socket.leave(room)

    const sockets = await io.in(room).fetchSockets()

    io.emit('get sockets', room, sockets.length)
  })

  socket.on('update rooms', updatedRooms => {
    io.allRooms = updatedRooms
    io.emit('get rooms', updatedRooms)
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