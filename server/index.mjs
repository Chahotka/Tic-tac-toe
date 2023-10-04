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

  io.emit('socket connected', socket.id, io.rooms)

  socket.on('create room', async roomName => {
    socket.room = roomName
    socket.join(roomName)

    const sockets = await io.in(roomName).fetchSockets()

    io.rooms.push({roomName, players: sockets.length, roomId: v4()})
    
    io.emit('room created', io.rooms)
  })

  socket.on('create player', playerName => {
    socket.name = playerName

    io.emit('player created', playerName, socket.id)
  })

  socket.on('join room', async roomName => {
    socket.room = roomName
    socket.join(roomName)

    const sockets = await io.in(roomName).fetchSockets()

    const currentRoom = io.rooms.filter(room => room.roomName === roomName)[0]
    currentRoom.players = sockets.length

    io.to(roomName).emit('reset stage')
    io.emit('socket joined', io.rooms, socket.id)

    if (sockets.length === 2) {
      io.emit('game started', [
        {name: sockets[0].name, id: sockets[0].id, figure: 'x'},
        {name: sockets[1].name, id: sockets[1].id, figure: 'o'},
      ])
    }
  })

  socket.on('leave room', async roomName => {
    socket.room = undefined
    socket.leave(roomName)

    const sockets = await io.in(roomName).fetchSockets()

    const currentRoom = io.rooms.filter(room => room.roomName === roomName)[0]
    currentRoom.players = sockets.length

    io.to(roomName).emit('reset stage')
    io.emit('socket left', io.rooms, socket.id, roomName)
  })

  socket.on('tag cell', (stage, tCount, turn) => {
    io.to(socket.room).emit('cell tagged', stage, tCount, turn)
  })

  socket.on('restart game', () => {
    io.to(socket.room).emit('game restarted')
  })

  socket.on('disconnect', async() => {
    if (!socket.room) {
      return
    }

    const sockets = await io.in(socket.room).fetchSockets()

    const currentRoom = io.rooms.filter(room => room.roomName === socket.room)[0]
    currentRoom.players = sockets.length

    io.to(socket.room).emit('reset stage')
    io.emit('socket left', io.rooms, socket.id, socket.room)
  })
})

httpServer.listen(5000, () => {
  console.log('Listening to 5000 bilya') 
})