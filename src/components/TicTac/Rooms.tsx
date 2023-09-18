// Количество игроков + на выход
import React, { useState, useContext, useEffect } from 'react'
import cl from '../../styles/rooms.module.css'
import clBtn from '../../styles/button.module.css'
import Modal from './Modal'
import { rooms } from '../../gameHelpers'
import { socket } from '../../socket'
import { FigureContext } from '../../context/FigureContext'


interface RoomsProps {
  reset: Function
}

const Rooms: React.FC<RoomsProps> = ({ reset }) => {
  const { room, setRoom } = useContext(FigureContext)
  const [players, setPlayers] = useState(0)
  const [joined, setJoined] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const joinRoom = (roomName: string) => {
    reset()

    socket.emit('join room', roomName, (players: number) => {
      setPlayers(players)
    })
  }

  const leaveRoom = () => {
    reset()

    socket.emit('leave room', room)
  }

  useEffect(() => {
    const onJoin = (room: string | null, joined: boolean) => {
      setRoom(room)
      setJoined(joined)
      console.log(room, ' Joined: ', joined)
    }
    const onLeave = (room: null, joined: boolean) => {
      setRoom(room)
      setJoined(joined)
      console.log(room, ' Joined: ', joined)
      console.log(socket.id)
    }

    socket.on('joined', onJoin)
    socket.on('left', onLeave)

    return () => {
      socket.off('joined', onJoin)
      socket.off('left', onLeave)
    }
  }, [])

  return (
    <>
      {room}
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
                { room.name } |||| {`${players} / 2`}
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