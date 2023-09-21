// Добавить ограничитель на комнаты
import React, { useState, useContext, useEffect } from 'react'
import cl from '../../styles/rooms.module.css'
import clBtn from '../../styles/button.module.css'
import Modal from './Modal'
import { socket } from '../../socket'
import { FigureContext } from '../../context/FigureContext'
import { Room } from '../../interfaces/RoomInterface'


interface RoomsProps {
  reset: Function
}

const Rooms: React.FC<RoomsProps> = ({ reset }) => {
  const { room, setRoom } = useContext(FigureContext)
  const [rooms, setRooms] = useState<Room[]>([])
  const [joined, setJoined] = useState(false)
  const [roomName, setRoomName] = useState('')
  const [showModal, setShowModal] = useState(false)

  const joinRoom = (roomName: string | null) => {
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
      if (socket.id === socketId) {
        setRoom(roomName)
        setJoined(true)

        const currentRoom = rooms.filter(room => room.name === roomName)[0]
        currentRoom.players = socketsInRoom

        socket.emit('update rooms', rooms)
      }
    }
    const onLeave = (rooms: Room[], roomName: string, socketId: string, socketsInRoom: number) => {
      if (socket.id === socketId) {
        setRoom(null)
        setJoined(false)

        const currentRoom = rooms.filter(room => room.name === roomName)[0]
        currentRoom.players = socketsInRoom

        socket.emit('update rooms', rooms)
      }
    }
    const onRoomsUpdate = (rooms: Room[]) => {
      setRooms(rooms)

      console.log(rooms)
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


  return (
    <>
      {room}
      {showModal &&
        <Modal 
          type='create room'
          labelText='enter room name' 
          btnText='create'
          setShowModal={setShowModal}
          canExit={true}
        />
      }
      {!joined &&
        <button 
          className={
            [cl.button, clBtn.button].join(' ')
          }
          onClick={createRoom}
        >
          Create room
        </button>
      }
      {!joined &&
        <ul className={cl.rooms}>
          {rooms.map(room => {
            return (
              <li 
                key={room.name}
                className={cl.room}
                onClick={() => joinRoom(room.name)}
              >
                { room.name } |||| {`${room.players} / 2`}
              </li>
            )
          })}
        </ul>
      }
      {joined &&
        <button 
          className={
            [cl.button, clBtn.button].join(' ')
          }
          onClick={leaveRoom}
        >
          Leave room
        </button>
      }
    </>
  )
}

export default Rooms