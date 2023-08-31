import React from 'react'
import cl from '../../styles/gameover.module.css'

interface GameoverProps {
  reason: string | null
  gameoverHandler: Function
}

const Gameover: React.FC<GameoverProps> = ({reason, gameoverHandler}) => {

  return (
    <div className={cl.gameover}>
      <p className={cl.reason}>
        { reason }
      </p>
      <button className={cl.button} onClick={() => gameoverHandler()}>Restart?</button>
    </div>
  )
}

export default Gameover