import React, { useState, useEffect } from 'react'
import useStage from '../hooks/useStage'
import usePlayer from '../hooks/usePlayer'
import Stage from './TicTac/Stage'
import useGameover from '../hooks/useGameover'
import Gameover from './TicTac/Gameover'
import { checkGameover, createStage } from '../gameHelpers'
import { TFigure } from '../interfaces/ContextInterface'
import { socket } from '../socket'
import Modal from './TicTac/Modal'
import Rooms from './TicTac/Rooms'

const TicTac: React.FC = () => {
  const [figure, setFigure] = useState<TFigure>('x')
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

    socket.emit('Tag', stage, (response: string) => {
      console.log(response)
    })
  }

  const gameoverHandler = () => {
    setTCount(0)
    setStage(createStage())
    setGameover({
      over: false,
      reason: null
    })
  }

  socket.on('Tag', (arg) => {
    setStage(arg)
    checkGameover(arg, gameover, setGameover, tCount)
  })

  useEffect(() => {
    socket.connect()
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
        <Rooms />
      </aside>
    </>
  )
}

export default TicTac