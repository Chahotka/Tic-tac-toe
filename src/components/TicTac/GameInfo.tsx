import React from 'react'
import cl from '../../styles/gameinfo.module.css'
import { useFigureContext } from '../../context/FigureContext'
import { useTurnContext } from '../../context/TurnContext'
import { usePlayerContext } from '../../context/PlayerContext'
import { useRoomContext } from '../../context/RoomContext'

const GameInfo: React.FC = () => {
  const { turn } = useTurnContext()
  const { figure } = useFigureContext()
  const { roomName } = useRoomContext()
  const { playerName, lobby } = usePlayerContext()


  return (
    <div>
      <h1>Player name: { playerName }</h1>
      { roomName &&  <h2>Room name: { roomName }</h2> }
      <h2>Current figure: { figure }</h2>
      { roomName && <h2>Current turn { turn }</h2> }
    </div>
  )
}

export default GameInfo