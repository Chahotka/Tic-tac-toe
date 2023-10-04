import React from 'react'
import cl from '../../styles/gameover.module.css'
import Button from '../UI/Button/Button'

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
      <Button text='Restart?' action={gameoverHandler}/>
    </div>
  )
}

export default Gameover