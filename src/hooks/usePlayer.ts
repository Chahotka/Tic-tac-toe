import { Dispatch, SetStateAction } from 'react'
import { Figure } from '../interfaces/FigureConInterface'
import { Turn } from '../interfaces/TurnConInterface'

const usePlayer =
  (
    room: string | null,
    turn: Figure,
    setTurn: Dispatch<SetStateAction<Figure>>,
    figure: Turn,
    setFigure: Dispatch<SetStateAction<Turn>>
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