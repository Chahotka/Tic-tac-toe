import React, { useContext, useState } from 'react'
import useStage from '../hooks/useStage'
import usePlayer from '../hooks/usePlayer'
import { FigureContext } from '../context/FigureContext'
import Stage from './TicTac/Stage'
import useGameover from '../hooks/useGameover'
import Gameover from './TicTac/Gameover'

const TicTac: React.FC = () => {
  const [tCount, setTCount] = useState(0)
  const { figure, setFigure } = useContext(FigureContext)
  const {  updatePlayer } = usePlayer(figure, setFigure)
  const { stage, setStage } = useStage(figure)
  const { gameover, setGameover } = useGameover(stage, tCount)

  const tag = (cell: [string | number, string]) => {
    if (cell[1] === 'tagged' || gameover) {
      return
    }
    
    updatePlayer()
    cell[0] = figure
    cell[1] = 'tagged'
    setTCount((prev: number) => prev += 1)
  }

  return (
    <>
      <Stage stage={stage} tag={tag}/>
      {gameover && <Gameover setGameover={setGameover}/>}
    </>
  )
}

export default TicTac