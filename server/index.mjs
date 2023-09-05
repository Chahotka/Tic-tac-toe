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

app.get('/', (req, res) => {
  res.send('alive')
})

io.of('/room1', socket => {
  console.log(io.engine.clientsCount)
})

httpServer.listen(5000, () => {
  console.log('Listening to 5000 bilya') 
})