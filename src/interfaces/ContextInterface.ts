export type TFigure = 'x' | 'o'

export interface ContextInterface {
  room: string | null
  setRoom: React.Dispatch<React.SetStateAction<string | null>>
  figure: TFigure
  setFigure: React.Dispatch<React.SetStateAction<TFigure>>,
  turn: TFigure
  setTurn: React.Dispatch<React.SetStateAction<TFigure>>
}