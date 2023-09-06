import React, { useState, useEffect } from 'react'
import useStage from '../hooks/useStage'
import usePlayer from '../hooks/usePlayer'
import Stage from './TicTac/Stage'
import useGameover from '../hooks/useGameover'
import Gameover from './TicTac/Gameover'
import { checkGameover, createStage } from '../gameHelpers'
import { TFigure } from '../interfaces/ContextInterface'
import { socket } from '../socket'

const TicTac: React.FC = () => {

  const [defFigure, setDefFigure] = useState<TFigure>('x')
  const [figure, setFigure] = useState<TFigure>(defFigure)
  const [tCount, setTCount] = useState(0)
  const {  updatePlayer } = usePlayer(figure, setFigure)
  const { stage, setStage } = useStage(figure)
  const { gameover, setGameover } = useGameover(stage, tCount)

  useEffect(() => {
    socket.connect()
  }, [])

  useEffect(() => {
    setFigure(defFigure)
  }, [defFigure])


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
    defFigure === 'x'
      ? setDefFigure('o')
      : setDefFigure('x')
  }

  socket.on('Tag', (arg) => {
    console.log(arg)
    setStage(arg)
    checkGameover(arg, gameover, setGameover, tCount)
    console.log(gameover)
  })

  return (
    <>
      <Stage stage={stage} tag={tag}/>
      {
        gameover.over && 
        <Gameover 
          reason={gameover.reason}
          gameoverHandler={gameoverHandler}
        />
      }
    </>
  )
}

export default TicTac