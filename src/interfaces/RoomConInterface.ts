import { Dispatch, SetStateAction } from 'react'

export interface Room {
  roomName: string | null
  players: number | null
}

export interface RoomConInterface {
  roomName: string | null
  setRoomName: Dispatch<SetStateAction<string | null>>
  players: number | null
  setPlayers: Dispatch<SetStateAction<number | null>>
}