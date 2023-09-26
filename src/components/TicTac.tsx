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

const TicTac: React.FC = () => {
  const [tCount, setTCount] = useState(0)
  const [showModal, setShowModal] = useState(true)
  const [playerName, setPlayerName] = useState('')
  const [gameStarted, setGameStarted] = useState(false)

  const { roomName } = useRoomContext()
  const { turn, setTurn} = useTurnContext()
  const { figure, setFigure } = useFigureContext()

  const { stage, setStage } = useStage(figure)
  const { gameover, setGameover } = useGameover(stage, tCount)
  const { updatePlayer } = usePlayer(roomName, turn, setTurn, figure, setFigure)

  const tag = (cell: [string | number, string]) => {
    if (cell[1] === 'tagged' || gameover.over) {
      return
    }
    if (roomName) {
      if (turn !== figure || !gameStarted) {
        return
      }
    }

    updatePlayer()
    
    cell[0] = figure
    cell[1] = 'tagged'
    setTCount(tCount + 1)

    if (roomName) {
      socket.emit('tag cell', { roomName, stage, tCount: tCount + 1, turn })
    }
  }

  const gameoverHandler = () => {
    reset()
  }

  const reset = (figure?: boolean) => {
    setTCount(0)
    setStage(createStage())
    setGameover({
      over: false,
      reason: null
    })

    if (figure) {
      setFigure('x')
      setTurn('x')
    }
    if (roomName) {
      socket.emit('restart game', roomName)
    }
  }

  useEffect(() => {
    const onPlayer = (name: string, socketId: string) => {
      if (socket.id === socketId) {
        setPlayerName(name)
      }
    }
    const onTag = (stage: Stages, moveCount: number, turn: string) => {
      setStage(stage)
      setTCount(moveCount)
      turn === 'x' ? setTurn('o') : setTurn('x')
    }
    const onStarted = async(players: Player[]) => {
      players.forEach(player => {
        if (player.id === socket.id) {
          console.log(player.name)
          setFigure(player.figure)
        }
      })
    }
    const onRestart = () => {
      reset()
    }

    socket.on('player created', onPlayer)
    socket.on('cell tagged', onTag)
    socket.on('game started', onStarted)
    socket.on('game restarted', onRestart)

    return () => {
      socket.off('player created', onPlayer)
      socket.off('cell tagged', onTag)
      socket.off('game started', onStarted)
      socket.off('game restarted', onRestart)
    }
  }, [])

  console.log(playerName)

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
        <span>Player name: { playerName && playerName }; Figure: {figure}</span>
        <Stage stage={stage} tag={tag} gameStarted={gameStarted}/>
        <span>Current move: { turn }</span>
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