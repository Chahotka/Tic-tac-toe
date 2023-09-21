import React from 'react'
import cl from '../../styles/rooms.module.css'
import { Room } from '../../interfaces/RoomInterface'

interface RoomsProps {
  rooms: Room[]
  join: Function
}

const RoomsList: React.FC<RoomsProps> = ({rooms, join}) => {

  return (
    <>
      <ul className={cl.rooms}>
        {rooms.map(room => {
          return (
            <li 
              key={room.name}
              className={cl.room}
              onClick={() => join(room.name)}
            >
              { room.name } |||| {`${room.players} / 2`}
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default RoomsList