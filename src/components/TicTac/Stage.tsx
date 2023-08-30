import React from 'react'
import cl from '../../styles/stage.module.css'
import { Stages } from '../../gameHelpers'
import Cell from './Cell'

interface StageProps {
  stage: Stages
  tag: Function
}

const Stage: React.FC<StageProps> = ({stage, tag}) => {

  return (
    <ul className={cl.stage}>
      {stage.map(row=> 
        row.map(cell =>
            <Cell key={Math.random()} cell={cell} tag={tag} />
          )
        )}
    </ul>
  )
}

export default Stage