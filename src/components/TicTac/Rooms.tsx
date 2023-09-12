import React, { useState } from 'react'
import cl from '../../styles/rooms.module.css'
import clBtn from '../../styles/button.module.css'
import Modal from './Modal'
import { rooms } from '../../gameHelpers'
import { socket } from '../../socket'

const Rooms: React.FC = () => {
  const [joined, setJoined] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [roomName, setRoomName] = useState('')

  const joinRoom = (roomName: string) => {
    socket.emit('Join room', {room: roomName}, (res: string) => {
      console.log(res)
      setJoined(true)
    })
  }

  const leaveRoom = () => {
    socket.emit('Leave room', {player: socket.id}, (res: string) => {
      console.log(res)
      setJoined(false)
    })
  }


  return (
    <>
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