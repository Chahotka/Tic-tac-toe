import React, { useState } from 'react'
import cl from './modal.module.css'
import { socket } from '../../../socket'
import Button from '../Button/Button'

interface ModalProps {
  type: string
  labelText: string
  btnText: string
  canExit: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

const Modal: React.FC<ModalProps> = ({
  type,
  labelText,
  btnText,
  setShowModal,
  canExit
}) => {
  const [name, setName] = useState('')
  const [reason, setReason] = useState('')

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault()
    const stop = checkName()
    if (!stop) {
      return
    }

    if (type === 'create player') {
      socket.emit('create player', name)
    } else if (type === 'create room') {
      console.log('blya', name)
      socket.emit('create room', name)
    }


    setShowModal(false)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const checkName = () => {
    if (name.length < 2) {
      setReason('Name is too short')
      return false
    } else if (name.length > 20) {
      setReason('Name is too long')
      return false
    } else {
      setReason('')
      return true
    }
  }

  return (
    <div className={cl.modalBg}>
      <form onSubmit={(e) => submitHandler(e)} className={cl.modal} autoComplete='off'>
        <h1 className={cl.title}>{labelText}:</h1>
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
        {reason && <p>{reason}</p>}
        <Button text={btnText} action={submitHandler} />
      </form>
    </div>
  )
}

export default Modal