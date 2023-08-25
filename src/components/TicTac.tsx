import React, { useState } from 'react'
import useStage from '../hooks/useStage'
import Stage from './TicTac/Stage'

const TicTac: React.FC = () => {
  const { stage, setStage } = useStage()

  return (
    <>
      <Stage stage={stage}/>
    </>
  )
}

export default TicTac