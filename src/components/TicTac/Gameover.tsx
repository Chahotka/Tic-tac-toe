import React from 'react'
import cl from '../../styles/gameover.module.css'
import clBtn from '../../styles/button.module.css'

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
      <button className={clBtn.button} onClick={() => gameoverHandler()}>Restart?</button>
    </div>
  )
}

export default Gameover