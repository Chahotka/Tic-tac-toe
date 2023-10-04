import React, { useState, useEffect } from 'react'
import useStage from '../hooks/useStage'
import usePlayer from '../hooks/usePlayer'
import Stage from './TicTac/Stage'
import useGameover from '../hooks/useGameover'
import Gameover from './TicTac/Gameover'
import { Stages, createStage } from '../gameHelpers'
import Rooms from './TicTac/Rooms'
import { socket } from '../socket'
import Modal from './UI/Modal/Modal'
import { useFigureContext } from '../context/FigureContext'
import { useTurnContext } from '../context/TurnContext'
import { useRoomContext } from '../context/RoomContext'
import { Player } from '../interfaces/PlayerConInterface'
import { usePlayerContext } from '../context/PlayerContext'
import GameInfo from './TicTac/GameInfo'

const TicTac: React.FC = () => {
  const [tCount, setTCount] = useState(0)
  const [showModal, setShowModal] = useState(true)
  const [gameStarted, setGameStarted] = useState(false)

  const { roomName } = useRoomContext()
  const { turn, setTurn} = useTurnContext()
  const { setPlayerName, setLobby} = usePlayerContext()
  const { figure, setFigure } = useFigureContext()

  const { updatePlayer } = usePlayer()
  const { stage, setStage } = useStage(figure)
  const { gameover, setGameover } = useGameover(stage, tCount)

  const tag = (cell: [string | number, string]) => {
    if (cell[1] === 'tagged' || gameover.over) {
      return
    }
    if (roomName && !gameStarted || (turn !== figure)) {
      return
    }

    updatePlayer()
    
    cell[0] = figure
    cell[1] = 'tagged'
    setTCount(tCount + 1)

    if (roomName) {
      socket.emit('tag cell', 
        stage, 
        tCount + 1, 
        turn === 'x' ? 'o' : 'x'
      )
    }
  }

  const gameoverHandler = () => {
    reset()
  }

  const reset = () => {
    setTCount(0)
    setStage(createStage())
    setGameover({
      over: false,
      reason: null
    })
    if (roomName) {
      setGameStarted(false)
      socket.emit('restart game')
    }
  }

  useEffect(() => {
    const onCreate = (playerName: string, socketId: string) => {
      socket.id === socketId && setPlayerName(playerName)
    }
    const onStarted = (players: Player[]) => {
      players.forEach(player => {
        if (player.id === socket.id) {
          setLobby(players)
          setFigure(player.figure)
          setGameStarted(true)
        }
      })
    }
    const onStopped = () => {
      reset()
    }
    const onRestarted = () => {
      reset()
    }
    const onTagged = (stage: Stages, tCount: number, turn: 'x' | 'o') => {
      setStage(stage)
      setTCount(tCount)
      setTurn(turn)
    }

    socket.on('player created', onCreate)
    socket.on('game started', onStarted)
    socket.on('cell tagged', onTagged)
    socket.on('game restarted', onRestarted)
    socket.on('reset stage', onStopped)

    return () => {
      socket.off('player created', onCreate)
      socket.off('game started', onStarted)
      socket.off('cell tagged', onTagged)
      socket.off('game restarted', onRestarted)
      socket.on('reset stage', onStopped)
    }
  }, [])


  return (
    <>
      { showModal && 
        <Modal 
          type='create player'
          labelText={'enter player name'} 
          btnText={'save'}
          setShowModal={setShowModal} 
          canExit={false}
        />
      }
      <div className="game">
        <GameInfo />
        <Stage stage={stage} tag={tag} gameStarted={gameStarted}/>
        {gameover.over &&
          <Gameover
            reason={gameover.reason}
            gameoverHandler={gameoverHandler}
          />
        }
      </div>
      <aside className="aside">
        <Rooms reset={reset} setGameStarted={setGameStarted}/>
      </aside>
    </>
  )
}

export default TicTac