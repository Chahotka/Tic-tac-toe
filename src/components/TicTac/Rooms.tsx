// Добавить ограничитель на комнаты
import React, { useState, useContext, useEffect } from 'react'
import cl from '../../styles/rooms.module.css'
import clBtn from '../../styles/button.module.css'
import Modal from './Modal'
import { defRooms } from '../../gameHelpers'
import { socket } from '../../socket'
import { FigureContext } from '../../context/FigureContext'
import { Room } from '../../interfaces/RoomInterface'


interface RoomsProps {
  reset: Function
}

const Rooms: React.FC<RoomsProps> = ({ reset }) => {
  const { room, setRoom } = useContext(FigureContext)
  const [rooms, setRooms] = useState<Room[]>(defRooms)
  const [joined, setJoined] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const joinRoom = (roomName: string | null) => {
    reset()

    socket.emit('join room', roomName)
  }

  const leaveRoom = () => {
    reset()

    socket.emit('leave room', {room, id: socket.id})
  }

  useEffect(() => {
    const onConnect = (newRooms: Room[]) => {
      setRooms(newRooms)
    }
    const onJoin = (room: string | null, joined: boolean, ) => {
      setRoom(room)
      setJoined(joined)
    }
    const onLeave = (room: null, joined: boolean, id: string) => {
      if (socket.id === id) {
        setRoom(room)
        setJoined(joined)
      }
    }
    const onSockets = (room: string, sockets: number) => {
      const currentRoom: Room = rooms.filter(item => item.name === room)[0]
      currentRoom.players = sockets

      socket.emit('update rooms', rooms)
    }
    const onRooms = (updatedRooms: Room[]) => {
      setRooms(updatedRooms)
    }

    socket.on('get info', onConnect)
    socket.on('joined', onJoin)
    socket.on('left', onLeave)
    socket.on('get sockets', onSockets)
    socket.on('get rooms', onRooms)

    return () => {
      socket.off('get info', onConnect)
      socket.off('joined', onJoin)
      socket.off('left', onLeave)
      socket.off('get sockets', onSockets)
      socket.off('get rooms', onRooms)
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