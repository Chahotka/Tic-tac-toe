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


io.on('connect', async socket => {
  const sockets = await io.sockets.fetchSockets()

  if (!io.rooms) {
    io.rooms = []
  } else {
    if (sockets.length === 1) {
      socket.emit('socket connected', [], socket.id)
    } else {
      io.emit('socket connected', io.rooms, socket.id)
    }
  }

  socket.on('create player', name => {
    socket.name = name

    io.emit('player created', name, socket.id)
  })

  socket.on('create room', async(roomName) => {
    socket.room = roomName
    socket.join(roomName)

    const sockets = await io.in(roomName).fetchSockets()

    io.rooms.push({roomName: roomName, players: sockets.length, id: v4()})
    io.emit('room created', io.rooms, roomName, socket.id)
  })

  socket.on('join room', async(roomName) => {
    socket.room = roomName
    socket.join(roomName)

    const sockets = await io.in(roomName).fetchSockets()

    if (sockets.length === 2) {
      sockets[0].figure = 'x'
      sockets[1].figure = 'o'

      io.to(socket.room).emit('game started', 
        [{
          name: sockets[0].name,
          id: sockets[0].id,
          figure: sockets[0].figure
        },
        {
          name: sockets[1].name,
          id: sockets[1].id,
          figure: sockets[1].figure
        }]
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
    io.to(room).emit('cell tagged', stage, tCount, turn)
  })

  socket.on('restart game', (room) => {
    io.to(room).emit('game restarted')
  })

  socket.on('disconnect', async() => {
    if (socket.room) {
      const sockets = await io.in(socket.room).fetchSockets()

      io.emit('room left', io.rooms, socket.room, socket.id, sockets.length)
    }
  })
})

httpServer.listen(5000, () => {
  console.log('Listening to 5000 bilya') 
})