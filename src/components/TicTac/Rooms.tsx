import React, { useState, useContext } from 'react'
import cl from '../../styles/rooms.module.css'
import clBtn from '../../styles/button.module.css'
import Modal from './Modal'
import { rooms } from '../../gameHelpers'
import { socket } from '../../socket'
import { FigureContext } from '../../context/FigureContext'

const Rooms: React.FC = () => {
  const { room, setRoom } = useContext(FigureContext)
  const [joined, setJoined] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const joinRoom = (room: string) => {
    socket.emit('join room', room, (res: string) => {
      setRoom(res)
      setJoined(true)
    })
  }

  const leaveRoom = () => {
    socket.emit('leave room', room, (res: null) => {
      setRoom(res)
      setJoined(false)
    })
  }

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
                { room.name }
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