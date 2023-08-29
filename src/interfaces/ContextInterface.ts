export type TFigure = 'x' | 'o'

export interface ContextInterface {
  figure: TFigure
  setFigure: React.Dispatch<React.SetStateAction<TFigure>>
}