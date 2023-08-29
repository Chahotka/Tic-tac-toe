import React, { useContext } from 'react'
import useStage from '../hooks/useStage'
import usePlayer from '../hooks/usePlayer'
import { FigureContext } from '../context/FigureContext'
import Stage from './TicTac/Stage'
import useGameover from '../hooks/useGameover'

const TicTac: React.FC = () => {
  const { figure, setFigure } = useContext(FigureContext)
  const {  updatePlayer } = usePlayer(figure, setFigure)
  const { stage, setStage } = useStage(figure)
  const { gameover } = useGameover(stage)

  const tag = (cell: [string | number, string]) => {
    if (cell[1] === 'tagged' || gameover) {
      return
    }
    
    updatePlayer()
    cell[0] = figure
    cell[1] = 'tagged'
  }

  return (
    <>
      <Stage stage={stage} tag={tag}/>
      { gameover && 'gameover'}
    </>
  )
}

export default TicTac