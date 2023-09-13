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


io.on('connect', socket => {

  socket.on('create player', (name, callback) => {
    socket.name = name
    callback(`Name:( ${name} - ${socket.id})`)
  })

  socket.on('join room', (room, callback) => {
    socket.join(`${room}`)
    console.log(socket.rooms)
    callback(room)
  })

  socket.on('leave room', (room, callback) => {
    socket.leave(`${room}`)
    console.log(socket.rooms)
    callback()
  })

  socket.on('disconnect', () => {
    console.log(`${socket.name} logged out`)
  })
}) 


httpServer.listen(5000, () => {
  console.log('Listening to 5000 bilya') 
})