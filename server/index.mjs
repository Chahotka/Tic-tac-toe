import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { v4 } from 'uuid'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000'
  }
})


io.on('connect', socket => {
  if (!io.rooms) {
    io.rooms = []
  } else {
    io.emit('socket connected', io.rooms, socket.id)
  }

  socket.on('create player', name => {
    socket.name = name
  })

  socket.on('create room', async(roomName) => {
    socket.room = roomName
    socket.join(roomName)

    const sockets = await io.in(roomName).fetchSockets()

    io.rooms.push({name: roomName, players: sockets.length, id: v4()})
    io.emit('room created', io.rooms, roomName, socket.id)
  })
 
  socket.on('join room', async(roomName) => {
    socket.room = roomName
    socket.join(roomName)

    const sockets = await io.in(roomName).fetchSockets()

    if (sockets.length === 2) {
      sockets[0].figure = 'x'
      sockets[1].figure = 'o'

      io.emit('game started', 
        {
          id: sockets[0].id,
          figure: sockets[0].figure
        },
        {
          id: sockets[1].id,
          figure: sockets[1].figure
        }
      )
    }
    
    io.emit('room joined', io.rooms, roomName, socket.id, sockets.length)
  })

  socket.on('leave room', async(roomName) => {
    socket.room = undefined
    socket.leave(roomName)

    const sockets = await io.in(roomName).fetchSockets()

    io.emit('room left', io.rooms, roomName, socket.id, sockets.length)
  })

  socket.on('update rooms', rooms => {
    io.rooms = rooms.filter(room => room.players !== 0)

    io.emit('updated rooms', io.rooms)
  })

  socket.on('tag cell', ({room, stage, tCount, turn}) => {
    console.log(turn)
    io.to(room).emit('cell tagged', stage, tCount, turn)
  })

  socket.on('restart game', (room) => {
    io.to(room).emit('game restarted')
  })

  socket.on('disconnect', async() => {
    if (socket.room) {
      socket.leave(socket.room)

      const sockets = await io.in(socket.room).fetchSockets()

      io.emit('room left', io.rooms, socket.room, socket.id, sockets.length)
    }
  })
})

httpServer.listen(5000, () => {
  console.log('Listening to 5000 bilya') 
})