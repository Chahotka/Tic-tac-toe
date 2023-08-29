import { useState, Dispatch, SetStateAction } from 'react'
import { TFigure } from '../interfaces/ContextInterface'

const usePlayer = 
(
  figure: TFigure,
  setFigure: Dispatch<SetStateAction<TFigure>>
) => {
  const [player, setPlayer] = useState<TFigure>('x')

  const updatePlayer = () => {
    figure === 'x' ? setFigure('o') : setFigure('x')
    setPlayer(figure)
  }


  return { player, updatePlayer }
}

export default usePlayer