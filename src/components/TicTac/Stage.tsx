import React from 'react'
import cl from '../../styles/stage.module.css'
import { Stages } from '../../gameHelpers'
import Cell from './Cell'

interface StageProps {
  stage: Stages
}

const Stage: React.FC<StageProps> = ({stage}) => {

  return (
    <ul className={cl.stage}>
      {stage.map(row => 
        row.map((cell, key) =>
            <Cell key={key} cell={cell}/>
          )
        )}
    </ul>
  )
}

export default Stage