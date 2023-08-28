export type Stages = [number | string, string][][]

export const createStage = (): Stages => 
  Array.from(Array(3), () =>
    Array(3).fill([0, 'clear'])
  )


