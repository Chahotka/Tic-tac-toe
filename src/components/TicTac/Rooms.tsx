import React, { useState } from 'react'
import cl from '../../styles/rooms.module.css'
import useSocket from '../../hooks/useSocket'
import { rooms } from '../../rooms'

const Rooms: React.FC = () => {
  const [room, setRoom] = useState('')
  const { socket } = useSocket(room)

  return (
    <>
      <ul className={cl.rooms}>
        { rooms.map((room: {name: string}) => {
          return (
            <li
              className={cl.roomName}
              key={room.name}
            >
              { room.name }
            </li>
          )
        })
        }
        <button onClick={() => socket.disconnect()}>Disconnect</button>
      </ul>
    </>
  )
}

export default Rooms