import React, { useState, useContext } from 'react'
import useStage from '../hooks/useStage'
import usePlayer from '../hooks/usePlayer'
import { FigureContext } from '../context/FigureContext'
import Stage from './TicTac/Stage'

const TicTac: React.FC = () => {
  const [gameOver, setGameOver] = useState(false)

  const { figure, setFigure } = useContext(FigureContext)
  const { player, updatePlayer } = usePlayer(figure, setFigure)
  const { stage, setStage } = useStage()



  return (
    <>
      <Stage stage={stage}/>
    </>
  )
}

export default TicTac