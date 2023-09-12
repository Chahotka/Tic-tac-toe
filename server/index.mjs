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
  console.log('Socket connected')
  console.log(io.engine.clientsCount)

  socket.on('Tag', (stage, callback) => {
    io.emit('Tag', stage)
    callback('Move received in server')
  })

  socket.on('Create player', (playerData, callback) => {
    socket.name = playerData.name
    console.log(`Player: ${socket.name}`)
    callback(`Player ${playerData.name} authorized`)
  })

  socket.on('Join room', (joinData, callback) => {
    socket.join(`${joinData.room}`)
    console.log(`${socket.name} joined room: ${joinData.room}`)
    callback('suda nahui')
  })

  socket.on('Leave room', (leaveData, callback) => {
    socket.leave()
    console.log(`${socket.name} left room`)
    callback('tuda nahui')
  })

  socket.on('disconnect', () => {
    console.log(`Player ${socket.name} disconnected, total clients ${io.engine.clientsCount}`)
  })
})

httpServer.listen(5000, () => {
  console.log('Listening to 5000 bilya') 
})