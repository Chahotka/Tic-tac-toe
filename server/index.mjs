import { v4 } from 'uuid'
import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

app.get('/', (req, res) => {
  res.send('alivde')
})

io.on('connection', socket => {

})

httpServer.listen(5000)