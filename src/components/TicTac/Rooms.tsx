// Добавить ограничитель на комнаты
import React from 'react'
import Modal from '../UI/Modal/Modal'
import useRooms from '../../hooks/useRooms'
import RoomsList from './RoomsList'
import Button from '../UI/Button/Button'
import { useRoomContext } from '../../context/RoomContext'


interface RoomsProps {
  reset: Function
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>
}

const Rooms: React.FC<RoomsProps> = ({ reset, setGameStarted }) => {
  const { roomName } = useRoomContext()
  const {
    joinRoom,
    leaveRoom,
    createRoom,
    rooms,
    showModal,
    setShowModal,
  } = useRooms(reset, setGameStarted)


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
      {!roomName &&
        <Button
          text='Create Room'
          action={createRoom}
          styles={{ width: '100%' }}
        />
      }
      {!roomName &&
        <RoomsList
          rooms={rooms}
          join={joinRoom}
        />
      }
      {roomName &&
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