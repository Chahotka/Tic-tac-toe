import React, { useState, useContext, useEffect } from 'react'
import useStage from '../hooks/useStage'
import usePlayer from '../hooks/usePlayer'
import Stage from './TicTac/Stage'
import useGameover from '../hooks/useGameover'
import Gameover from './TicTac/Gameover'
import { Stages, createStage } from '../gameHelpers'
import Rooms from './TicTac/Rooms'
import { FigureContext } from '../context/FigureContext'
import { socket } from '../socket'
import Modal from './UI/Modal/Modal'
import { PlayerInterface } from '../interfaces/PlayerInterface'

const TicTac: React.FC = () => {
  const [tCount, setTCount] = useState(0)
  const { room, figure, setFigure, turn, setTurn } = useContext(FigureContext)
  const [showModal, setShowModal] = useState(true)
  const { updatePlayer } = usePlayer(room, turn, setTurn, figure, setFigure)
  const { stage, setStage } = useStage(figure)
  const { gameover, setGameover } = useGameover(stage, tCount)

  const tag = (cell: [string | number, string]) => {
    if (cell[1] === 'tagged' || gameover.over) {
      return
    }
    if (turn !== figure) {
      return
    }

    updatePlayer()
    
    cell[0] = figure
    cell[1] = 'tagged'
    setTCount(tCount + 1)

    if (room) {
      socket.emit('tag cell', { room, stage, tCount: tCount + 1, turn })
    }
  }
  console.log(turn)

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

    if (room) {
      socket.emit('restart game', room)
    }
  }

  useEffect(() => {
    const onTag = (stage: Stages, moveCount: number, turn: string) => {
      setStage(stage)
      setTCount(moveCount)
      turn === 'x' ? setTurn('o') : setTurn('x')
    }
    const onStarted = (player1: PlayerInterface, player2: PlayerInterface) => {
      if (socket.id === player1.id) {
        setFigure(player1.figure)
      } else if (socket.id === player2.id) {
        setFigure(player2.figure)
      }
    }
    const onRestart = () => {
      reset()
    }

    socket.on('cell tagged', onTag)
    socket.on('game started', onStarted)
    socket.on('game restarted', onRestart)

    return () => {
      socket.off('cell tagged', onTag)
      socket.off('game started', onStarted)
      socket.off('game restarted', onRestart)
    }
  }, [])

  return (
    <>
      {/* { showModal && 
        <Modal 
          type='create player'
          labelText={'enter player name'} 
          btnText={'save'} 
          setShowModal={setShowModal} 
          canExit={false}
        />
      } */}
      <div className="game">
        <Stage stage={stage} tag={tag} />
        {turn}
        {gameover.over &&
          <Gameover
            reason={gameover.reason}
            gameoverHandler={gameoverHandler}
          />
        }
      </div>
      <aside className="aside">
        <Rooms reset={reset} />
      </aside>
    </>
  )
}

export default TicTac