import { Dispatch, SetStateAction } from 'react'
import { TFigure } from '../interfaces/ContextInterface'

const usePlayer = 
(
  room: string | null,
  turn: TFigure,
  setTurn: Dispatch<SetStateAction<TFigure>>,
  figure: TFigure,
  setFigure: Dispatch<SetStateAction<TFigure>>
) => {

  const updatePlayer = () => {
    if (!room) {
      figure === 'x' ? setFigure('o') : setFigure('x')
    }
    turn === 'x' ? setTurn('o') : setTurn('x')
  }


  return { updatePlayer }
}

export default usePlayer