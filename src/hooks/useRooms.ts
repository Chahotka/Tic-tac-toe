import { useState, useEffect } from 'react'
import { Room } from '../interfaces/RoomConInterface'
import { socket } from '../socket'
import { useRoomContext } from '../context/RoomContext'

const useRooms = (
  reset: Function,
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { roomName, setRoomName, setPlayers } = useRoomContext()
  const [rooms, setRooms] = useState<Room[]>([])
  const [showModal, setShowModal] = useState(false)


  const joinRoom = (roomName: string | null) => {
    const currentRoom: Room = rooms.filter(room => room.roomName === roomName)[0]
    if (currentRoom.players === 2) {
      return
    }

    setRoomName(roomName)
    socket.emit('join room', roomName)
  }

  const leaveRoom = () => {
    socket.emit('leave room', roomName)
  }

  const createRoom = () => {
    setShowModal(true)
  }

  useEffect(() => {
    const onConnected = (rooms: Room[], socketId: string) => {
      if (socket.id === socketId) {
        socket.emit('update rooms', rooms)
      }
    }
    const onJoin = (rooms: Room[], roomName: string, socketId: string, socketsInRoom: number) => {
      reset()
      if (socket.id === socketId) {
        const currentRoom: Room = rooms.filter(room => room.roomName === roomName)[0]
        currentRoom.players = socketsInRoom


        if (currentRoom.players === 2) {
          console.log(currentRoom)
        }

        socket.emit('update rooms', rooms)
      }
    }
    const onLeave = (rooms: Room[], roomName: string, socketId: string, socketsInRoom: number) => {
      reset(true)
      if (socket.id === socketId) {
        setRoomName(null)
      }

      const currentRoom: Room = rooms.filter(room => room.roomName === roomName)[0]
      currentRoom.players = socketsInRoom

      if (currentRoom.players !== 2) {
        setGameStarted(false)
      }

      socket.emit('update rooms', rooms)
    }
    const onRoomsUpdate = (rooms: Room[]) => {
      setRooms(rooms)
    }
    const onCreateRoom = (updatedRooms: Room[], roomName: string, socketId: string) => {
      console.log(updatedRooms, roomName, socketId)
      if (socket.id === socketId) {
        setRoomName(roomName)
      }
      reset(true)
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
  }
}

export default useRooms