import React from 'react'

interface GameoverProps {
  setGameover: React.Dispatch<React.SetStateAction<boolean>>
}

const Gameover: React.FC<GameoverProps> = ({setGameover}) => {

  return (
    <>
      <p>Gameover</p>
      <button onClick={() => setGameover(false)}>Restart?</button>
    </>
  )
}

export default Gameover