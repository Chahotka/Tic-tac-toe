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
  socket.on('create player', (name, callback) => {
    socket.name = name
  })

  socket.on('join room', (room, callback) => {
    console.log(room)
    socket.room = room
    socket.join(`${room}`)
    callback()
  })

  socket.on('leave room', (room, callback) => {
    socket.room = undefined
    socket.leave(`${room}`)
    callback()
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