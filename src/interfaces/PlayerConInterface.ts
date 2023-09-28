import { Dispatch, SetStateAction } from 'react'
import { Figure } from './FigureConInterface'

export interface Player {
  id: string | undefined
  name: string | null
  figure: Figure
}

export interface PlayerConInterface {
  playerName: string | null
  setPlayerName: Dispatch<SetStateAction<string | null>>
  lobby: Player[] | null
  setLobby: Dispatch<SetStateAction<Player[]| null>>
}

