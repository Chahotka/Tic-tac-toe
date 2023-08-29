import { useState, useEffect } from 'react'
import { Stages, createStage } from '../gameHelpers'
import { TFigure } from '../interfaces/ContextInterface'


const useStage = (figure: TFigure) => {
  const [stage, setStage] = useState<Stages>(createStage())

  useEffect(() => {
    const updatedStage = (prevStage: Stages) => {
      const newStage = prevStage.map(row =>
          row.map((cell: any) => cell[1] === 'clear' ? [0, 'clear'] : cell)
        )

      return newStage
    }

    setStage((prev: Stages) => updatedStage(prev))
  }, [figure])

  return { stage, setStage }
}

export default useStage