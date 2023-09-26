import { Dispatch, SetStateAction } from 'react'

export type Turn = 'x' | 'o'

export interface TurnConInterface {
  turn: Turn
  setTurn: Dispatch<SetStateAction<Turn>>
}