import { useState, useEffect } from 'react'
import { Stages, createStage } from '../gameHelpers'
import { TFigure } from '../interfaces/ContextInterface'


const useStage = (player: TFigure) => {
  const [stage, setStage] = useState<Stages>(createStage())

  useEffect(() => {
    const updatedStage = (prevStage: Stages) => {
      const newStage = prevStage.map(row =>
          row.map((cell: any) => cell[1] === 'clear' ? [0, 'clear'] : cell)
        )

      console.log(newStage)

      return newStage
    }

    setStage((prev: Stages) => updatedStage(prev))
  }, [player])

  return { stage, setStage }
}

export default useStage