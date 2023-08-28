import { useState, Dispatch, SetStateAction } from 'react'
import { Figure } from '../interfaces/ContextInterface'

const usePlayer = 
(
  figure: Figure,
  setFigure: Dispatch<SetStateAction<Figure>>
) => {
  const [player, setPlayer] = useState('x')

  const updatePlayer = () => {
    figure === 'x' ? setFigure('o') : setFigure('x')
    setPlayer(figure)
  }
  

  return { player, updatePlayer }
}

export default usePlayer