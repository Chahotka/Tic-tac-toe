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
  console.log(io.engine.clientsCount)

  socket.on('Tag', (stage, callback) => {
    io.emit('Tag', stage)
    callback('Move received in server')
  })

  socket.on('Create player', (playerData, callback) => {
    console.log(playerData)
    callback('Player data received')
  })

  socket.on('Create room', (roomData, callback) => {
    console.log(roomData)
    callback('Room data received')
  })
})

httpServer.listen(5000, () => {
  console.log('Listening to 5000 bilya') 
})