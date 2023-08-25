import { Dispatch, SetStateAction } from 'react'

type Figure = 'x' | 'o' | null

export interface FigureInteface{
  figure: string
  setFigure: Dispatch<SetStateAction<Figure>>
}