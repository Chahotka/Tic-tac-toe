export type Figure = 'x' | 'o'

export interface ContextInterface {
  figure: Figure
  setFigure: React.Dispatch<React.SetStateAction<Figure>>
}