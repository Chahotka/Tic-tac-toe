import { useState, useEffect } from 'react'
import { Room } from '../interfaces/RoomConInterface'
import { socket } from '../socket'
import { useRoomContext } from '../context/RoomContext'
import { usePlayerContext } from '../context/PlayerContext'

const useRooms = (
  reset: Function,
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [rooms, setRooms] = useState<Room[]>([])
  const [showModal, setShowModal] = useState(false)

  const { lobby, setLobby } = usePlayerContext()
  const { roomName, setRoomName, setPlayers } = useRoomContext()


  const joinRoom = (roomName: string | null) => {
    const currentRoom: Room = rooms.filter(room => room.roomName === roomName)[0]
    if (currentRoom.players === 2) {
      return
    }

    reset()
    setRoomName(roomName)

    socket.emit('join room', roomName, socket.id)
  }

  const leaveRoom = () => {
    socket.emit('leave room', roomName)

    reset()
    setRoomName(null)
  }

  const createRoom = () => {
    setShowModal(true)
  }

  useEffect(() => {
    const onConnected = (socketId: string, updatedRooms: Room[]) => {
      if (socket.id === socketId) {
        setRooms(updatedRooms)
      }
    }
    const onCreate = (updatedRooms: Room[]) => {
      setRooms(updatedRooms)
    }
    const onJoin = (updatedRooms: Room[]) => {
      setRooms(updatedRooms)
    }
    const onLeft = (updatedRooms: Room[], socketId: string, room: string) => {
      setRooms(updatedRooms)

      if (roomName === room) {
        reset()
      }
    }

    socket.on('socket connected', onConnected)
    socket.on('room created', onCreate)
    socket.on('socket joined', onJoin)
    socket.on('socket left', onLeft)

    return () => {
      socket.off('room created', onCreate)
      socket.off('socket connected', onConnected)
      socket.off('socket joined', onJoin)
      socket.off('socket left', onLeft)
  }
  })

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