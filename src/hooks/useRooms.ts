import { useState, useEffect, useContext } from 'react'
import { Room } from '../interfaces/RoomInterface'
import { socket } from '../socket'
import { FigureContext } from '../context/FigureContext'

const useRooms = (
    reset: Function
  ) => {
  const { room, setRoom } = useContext(FigureContext)
  const [rooms, setRooms] = useState<Room[]>([])
  const [joined, setJoined] = useState(false)
  const [showModal, setShowModal] = useState(false)


  const joinRoom = (roomName: string | null) => {
    const currentRoom: Room = rooms.filter(room => room.name === roomName)[0]
    if (currentRoom.players === 2) {
      return
    }

    socket.emit('join room', roomName)
  }

  const leaveRoom = () => {
    socket.emit('leave room', room)
  }

  const createRoom = () => {
    setShowModal(true)
  }

  useEffect(() => {
    const onConnected = (rooms: Room[], socketId: string) => {
      if (socket.id === socketId) {
        setRooms(rooms)
      }
    }
    const onJoin = (rooms: Room[], roomName: string, socketId: string, socketsInRoom: number) => {
      reset()
      if (socket.id === socketId) {
        setRoom(roomName)
        setJoined(true)

        const currentRoom: Room = rooms.filter(room => room.name === roomName)[0]
        currentRoom.players = socketsInRoom

        socket.emit('update rooms', rooms)
      }
    }
    const onLeave = (rooms: Room[], roomName: string, socketId: string, socketsInRoom: number) => {
      reset()
      if (socket.id === socketId) {
        setRoom(null)
        setJoined(false)
      }
      const currentRoom: Room = rooms.filter(room => room.name === roomName)[0]
      currentRoom.players = socketsInRoom

      socket.emit('update rooms', rooms)
    }
    const onRoomsUpdate = (rooms: Room[]) => {
      setRooms(rooms)
    }
    const onCreateRoom = (updatedRooms: Room[], roomName: string, socketId: string) => {
      if (socket.id === socketId) {
        setRoom(roomName)
        setJoined(true)
      }
      setRooms(updatedRooms)
    }

    socket.on('socket connected', onConnected)
    socket.on('room joined', onJoin)
    socket.on('room left', onLeave)
    socket.on('updated rooms', onRoomsUpdate)
    socket.on('room created', onCreateRoom)

    return () => {
      socket.off('connected', onConnected)
      socket.off('room joined', onJoin)
      socket.off('room left', onLeave)
      socket.off('updated rooms', onRoomsUpdate)
      socket.off('room created', onCreateRoom)
    }
  }, [])

  return { 
    joinRoom, 
    leaveRoom, 
    createRoom, 
    rooms, 
    showModal, 
    setShowModal, 
    joined, 
    setJoined 
  }
}

export default useRooms