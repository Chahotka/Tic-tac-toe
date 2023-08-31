export interface GameoverInterface {
  over: boolean
  reason: 'X Win' | 'O Win' | 'Draw' | null
}