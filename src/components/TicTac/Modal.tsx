import React, { useEffect, useState } from 'react'
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

const Modal: React.FC<ModalProps> = ({
    type,
    labelText, 
    btnText,
    setShowModal, 
    canExit
  }) => {
  const [name , setName] = useState('')
  const [reason, setReason] = useState('')

  const submitHandler = async(e: React.FormEvent) => {
    e.preventDefault()
    const stop = checkName()
    if (!stop) {
      return
    }
    
    socket.emit('create player', name)
    
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