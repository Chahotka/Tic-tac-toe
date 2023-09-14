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
    callback(`Name:( ${name} - ${socket.id})`)
  })

  socket.on('join room', (room, callback) => {
    socket.join(`${room}`)
    console.log
    callback(room)
  })

  socket.on('leave room', (room, callback) => {
    socket.leave(`${room}`)
    callback()
  })

  socket.on('tag cell', ({room, stage}) => {
    io.to(`${room}`).emit('get stage', stage)
  })

  socket.on('restart game', ({room, stage, gameover, tCount}, callback) => {
    io.to(`${room}`).emit('restart', {stage, gameover, tCount})
  })

  socket.on('disconnect', () => {
    console.log(`${socket.name} logged out`)
  })
}) 






httpServer.listen(5000, () => {
  console.log('Listening to 5000 bilya') 
})