import React, { useContext, useState, useEffect } from 'react'
import useStage from '../hooks/useStage'
import usePlayer from '../hooks/usePlayer'
import { FigureContext } from '../context/FigureContext'
import Stage from './TicTac/Stage'
import useGameover from '../hooks/useGameover'
import Gameover from './TicTac/Gameover'
import { createStage } from '../gameHelpers'
import { TFigure } from '../interfaces/ContextInterface'

const TicTac: React.FC = () => {
  const [defFigure, setDefFigure] = useState<TFigure>('x')
  const [figure, setFigure] = useState<TFigure>(defFigure)
  const [tCount, setTCount] = useState(0)
  // const { figure, setFigure } = useContext(FigureContext)
  const {  updatePlayer } = usePlayer(figure, setFigure)
  const { stage, setStage } = useStage(figure)
  const { gameover, setGameover } = useGameover(stage, tCount)

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