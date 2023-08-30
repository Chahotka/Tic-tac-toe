import React from 'react'
import { GameoverInterface } from '../../interfaces/GameoverInterface'
import { Stages, createStage } from '../../gameHelpers'

interface GameoverProps {
  reason: string | null
  gameoverHandler: Function
}

const Gameover: React.FC<GameoverProps> = ({reason, gameoverHandler}) => {

  return (
    <>
      <p>
        {reason === 'draw'
          ? 'draw'
          : reason
        }
      </p>
      <button onClick={() => gameoverHandler()}>Restart?</button>
    </>
  )
}

export default Gameover