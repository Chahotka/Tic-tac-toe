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

export const checkGameover = (
  stage: Stages,
  setGameover: React.Dispatch<React.SetStateAction<GameoverInterface>>,
  tCount: number,
  ) => {
  const figuresArray = stage.map(row => row.map(cell => cell[0]))
  
  // Пробежать по массиву figuresArray для проверки фигур по вертика и горизонтали
  for (let x = 0; x < figuresArray.length; x++) {
    if (
      // Проверка на схожесть фигур по горизонтали
      figuresArray[x][0] === figuresArray[x][1] &&
      figuresArray[x][0] === figuresArray[x][2] &&
      // Проверка на то что в ячейке есть фигура
      figuresArray[x][0] !== 0
    ) {
      setGameover({
        over: true,
        reason: figuresArray[x][0] === 'x' ? 'x win' : 'o win'
      })
      console.log('horiz')
    } else if (
      // Проверка на схожесть по вертикали
      figuresArray[0][x] === figuresArray[1][x] &&
      figuresArray[0][x] === figuresArray[2][x] &&
      figuresArray[0][x] !== 0
    ) {
      setGameover({
        over: true,
        reason: figuresArray[0][x] === 'x' ? 'x win' : 'o win'
      })
      console.log('vert')
    }
  }
  if (
    // Проверка на схожесть по диагонали
    figuresArray[0][0] === figuresArray[1][1] &&
    figuresArray[0][0] === figuresArray[2][2] &&
    figuresArray[0][0] !== 0 ||
    figuresArray[0][2] === figuresArray[1][1] &&
    figuresArray[0][2] === figuresArray[2][0] &&
    figuresArray[0][2] !== 0
  ) {
    setGameover({
      over: true,
      reason: figuresArray[1][1] === 'x' ? 'x win' : 'o win'
    })
  }

  // Проверка на ничью
  if (tCount === 9) {
    setGameover({
      over: true,
      reason: 'draw'
    })
    console.log('draw conc')
  }
}