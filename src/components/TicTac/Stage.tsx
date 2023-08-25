import React from 'react'
import cl from '../../styles/stage.module.css'
import { StageInterface } from '../../interfaces/StageInterface'
import Cell from './Cell'

interface StageProps {
  stage: StageInterface[]
}

const Stage: React.FC<StageProps> = ({stage}) => {

  return (
    <ul className={cl.stage}>
      {stage.map(item =>
          <Cell 
            key={item.index}
            cell={item}
            stage={stage}
          />
        )
      }
    </ul>
  )
}

export default Stage