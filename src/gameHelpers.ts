import { GameoverInterface } from "./interfaces/GameoverInterface"

export type Figures = [number | string][]
export type Stages = [number | string, string][][]

export const createStage = (): Stages => 
  [
    [
      [0, 'clear'],
      [0, 'clear'],
      [0, 'clear']
    ],
    [
      [0, 'clear'],
      [0, 'clear'],
      [0, 'clear']
    ],
    [
      [0, 'clear'],
      [0, 'clear'],
      [0, 'clear']
    ]
  ]

export const rooms = [
  {name: 'Room 1'},
  {name: 'Room 2'},
  {name: 'Room 3'},
  {name: 'Room 4'},
  {name: 'Room 5'}
]

export const checkGameover = (
  stage: Stages,
  gameover: GameoverInterface,
  setGameover: React.Dispatch<React.SetStateAction<GameoverInterface>>,
  tCount: number,
  ) => {
  const figuresArray = stage.map(row => row.map(cell => cell[0]))
  
  // Пробежать по массиву figuresArray для проверки фигур
  for (let x = 0; x < figuresArray.length; x++) {
    if (
      // Проверка горизонтали
      figuresArray[x][0] === figuresArray[x][1] &&
      figuresArray[x][0] === figuresArray[x][2] &&
      figuresArray[x][0] !== 0
    ) {
      setGameover({
        over: true,
        reason: figuresArray[x][0] === 'x' ? 'X Win' : 'O Win'
      })
      return
    } else if (
      // По вертикали
      figuresArray[0][x] === figuresArray[1][x] &&
      figuresArray[0][x] === figuresArray[2][x] &&
      figuresArray[0][x] !== 0
    ) {
      setGameover({
        over: true,
        reason: figuresArray[0][x] === 'x' ? 'X Win' : 'O Win'
      })
      return
    } else if (
      // По диагонали
      figuresArray[0][0] === figuresArray[1][1] &&
      figuresArray[0][0] === figuresArray[2][2] &&
      figuresArray[0][0] !== 0 
      ||
      figuresArray[0][2] === figuresArray[1][1] &&
      figuresArray[0][2] === figuresArray[2][0] &&
      figuresArray[0][2] !== 0
    ) {
      setGameover({
        over: true,
        reason: figuresArray[1][1] === 'x' ? 'X Win' : 'O Win'
      })
      return
    } else if ( 
      // Проверка на ничью
      tCount === 9
    ) {
      setGameover({
        over: true,
        reason: 'Draw'
      })
      return
    }
  }
  
}