// Добавить ограничитель на комнаты
import React, { useState, useContext } from 'react'
import cl from '../../styles/rooms.module.css'
import Modal from '../UI/Modal/Modal'
import { socket } from '../../socket'
import { FigureContext } from '../../context/FigureContext'
import { Room } from '../../interfaces/RoomInterface'
import useRooms from '../../hooks/useRooms'
import RoomsList from './RoomsList'
import Button from '../UI/Button/Button'


interface RoomsProps {
  reset: Function
}

const Rooms: React.FC<RoomsProps> = ({ reset }) => {
  const { room, setRoom } = useContext(FigureContext)
  const {
    joinRoom,
    leaveRoom,
    createRoom,
    rooms,
    showModal,
    setShowModal,
    joined,
    setJoined
  } = useRooms(reset)

  return (
    <>
      {showModal &&
        <Modal
          type='create room'
          labelText='enter room name'
          btnText='Create Room'
          setShowModal={setShowModal}
          canExit={true}
        />
      }
      {!joined &&
        <Button
          text='Create Room'
          action={createRoom}
          styles={{ width: '100%' }}
        />
      }
      {!joined &&
        <RoomsList
          rooms={rooms}
          join={joinRoom}
        />
      }
      {joined &&
        <Button
          text='Leave Room'
          action={leaveRoom}
          styles={{ width: '100%' }}
        />
      }
    </>
  )
}

export default Rooms