import React, { useState } from 'react'
import cl from '../../styles/modal.module.css'
import clBtn from '../../styles/button.module.css'
import { socket } from '../../socket'
import { v4 } from 'uuid'

interface ModalProps {
  type: string
  labelText: string
  btnText: string
  canExit: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

const Modal: React.FC<ModalProps> = (
  {
    type,
    labelText, 
    btnText,
    setShowModal, 
    canExit}
  ) => {
  const [name , setName] = useState('')
  const [reason, setReason] = useState('')

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()

    if (name.length < 2) {
      setReason('Name is too short')
      return
    } else if (name.length > 20) {
      setReason('Name is too long')
      return
    } else {
      setReason('')
    }

    setShowModal(false)

    if (type === 'create player') {
      socket.connect()
      socket.emit('Create player', {name: name, id: socket.id}, (res: string) => {
        console.log(res)
      })
    } else if (type === 'create room') {
      socket.emit('Create room', {roomName: name, roomId: v4()}, (res: string) => {
        console.log(res)
      })
    }
  }

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <div className={cl.modalBg}>
      <form onSubmit={(e) => submitHandler(e)} className={cl.modal} autoComplete='off'>
        <h1 className={cl.title}>{ labelText }:</h1>
        <input 
          id='modalInput' 
          className={cl.input} 
          type="text" 
          value={name}
          maxLength={30}
          onChange={(e) => setName(e.target.value)}
        />
        {canExit && 
          <span 
            className={cl.close}
            onClick={closeModal}
          ></span>
        }
        { reason && <p>{ reason }</p>}
        <button 
          className={[clBtn.button, cl.btn].join(' ')}>{ btnText }</button>
      </form>
    </div>
  )
}

export default Modal