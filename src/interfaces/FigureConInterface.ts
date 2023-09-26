import { Dispatch, SetStateAction } from 'react'

export type Figure = 'x' | 'o'

export interface FigureConInterface {
  figure: Figure
  setFigure: Dispatch<SetStateAction<Figure>>
}