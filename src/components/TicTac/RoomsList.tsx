import React from 'react'
import cl from '../../styles/rooms.module.css'
import { Room } from '../../interfaces/RoomConInterface'
import { v4 } from 'uuid'

interface RoomsProps {
  rooms: Room[]
  join: Function
}

const RoomsList: React.FC<RoomsProps> = ({ rooms, join }) => {

  return (
    <>
      <ul className={cl.rooms}>
        {rooms.map(room => {
          return (
            <li
              key={v4()}
              className={cl.room}
              onClick={() => join(room.roomName)}
            >
              {room.roomName} |||| {`${room.players} / 2`}
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default RoomsList