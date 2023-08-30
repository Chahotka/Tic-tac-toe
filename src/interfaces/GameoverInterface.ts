export interface GameoverInterface {
  over: boolean
  reason: 'x win' | 'o win' | 'draw' | null
}