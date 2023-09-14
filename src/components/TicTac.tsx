import React, { useState, useEffect, useContext } from 'react'
import useStage from '../hooks/useStage'
import usePlayer from '../hooks/usePlayer'
import Stage from './TicTac/Stage'
import useGameover from '../hooks/useGameover'
import Gameover from './TicTac/Gameover'
import { Stages, createStage } from '../gameHelpers'
import { TFigure } from '../interfaces/ContextInterface'
import Modal from './TicTac/Modal'
import Rooms from './TicTac/Rooms'
import { FigureContext } from '../context/FigureContext'
import { socket } from '../socket'

const TicTac: React.FC = () => {
  const { figure, setFigure, room } = useContext(FigureContext)
  const [tCount, setTCount] = useState(0)
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
      socket.emit('tag cell', {room, stage})
    }
  }

  const gameoverHandler = () => {
    setTCount(0)
    setStage(createStage())
    setGameover({
      over: false,
      reason: null
    })

    if (room) {
      console.log('ahkasdl')
      socket.emit('restart game', {
        room,
        stage: createStage(),
        gameover: {
          over: false,
          reason: null
        },
        tCount: 0
      })
    }
  }

  socket.on('get stage', stage => {
    console.log(stage)
    setStage(stage)
  })
  socket.on('restart', ({stage, gameover, tCount}) => {
    setStage(stage)
    setGameover(gameover)
    setTCount(tCount)
  })


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
        <Rooms />
      </aside>
    </>
  )
}

export default TicTac