import { useState, Dispatch, SetStateAction } from 'react'
import { TFigure } from '../interfaces/ContextInterface'

const usePlayer = 
(
  figure: TFigure,
  setFigure: Dispatch<SetStateAction<TFigure>>
) => {

  const updatePlayer = () => {
    figure === 'x' ? setFigure('o') : setFigure('x')
  }


  return { updatePlayer }
}

export default usePlayer