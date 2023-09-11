import React, { useState } from 'react'
import cl from '../../styles/rooms.module.css'
import clBtn from '../../styles/button.module.css'
import Modal from './Modal'

const Rooms: React.FC = () => {
  const [showModal, setShowModal] = useState(false)
  const [roomName, setRoomName] = useState('')


  const createRoom = () => {
    setShowModal(true)
    console.log('wha')
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
      <ul className={cl.rooms}>
        <li className={cl.room} >Room</li>
      </ul>
      <button 
        className={
          [cl.button, clBtn.button].join(' ')
        }
        onClick={createRoom}
      >
        Create Room
      </button>
    </>
  )
}

export default Rooms