import React, { useState, useContext, useEffect } from 'react'
import useStage from '../hooks/useStage'
import usePlayer from '../hooks/usePlayer'
import Stage from './TicTac/Stage'
import useGameover from '../hooks/useGameover'
import Gameover from './TicTac/Gameover'
import { Stages, createStage } from '../gameHelpers'
import Modal from './TicTac/Modal'
import Rooms from './TicTac/Rooms'
import { FigureContext } from '../context/FigureContext'
import { socket } from '../socket'

const TicTac: React.FC = () => {
  const [tCount, setTCount] = useState(0)
  const { figure, setFigure, room } = useContext(FigureContext)
  const [showModal, setShowModal] = useState(true)
  const {  updatePlayer } = usePlayer(figure, setFigure)
  const { stage, setStage } = useStage(figure)
  const { gameover, setGameover } = useGameover(stage, tCount)

  const tag = (cell: [string | number, string]) => {
    if (cell[1] === 'tagged' || gameover.over) {
      return
    }
    
    updatePlayer()
    cell[0] = figure
    cell[1] = 'tagged'
    setTCount((prev: number) => prev += 1)

    if (room) {
      socket.emit('tag cell', {stage, tCount: tCount + 1})
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

    if (room) {
      socket.emit('restart game')
    }
  }

  useEffect(() => {
    const onTag = (stage: Stages, tCount: number) => {
      setStage(stage)
      setTCount(tCount)
    }
    const onRestart = () => {
      reset()
    }
  

    socket.on('get tagged', onTag)
    socket.on('restart', onRestart)

    return () => {
      socket.off('tag cell', onTag)
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
        <Stage stage={stage} tag={tag}/>
        {
          gameover.over && 
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