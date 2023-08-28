import { useState } from 'react'
import { Stages, createStage } from '../gameHelpers'


const useStage = () => {
  const [stage, setStage] = useState<Stages>(createStage())

  // useEffect(() => {
  //   // обновить поле после хода
  //   const updatedStage = (prevStagee) => {
  //     const newStage = prevStage.map(row =>
  //         row.map((cell: any) =>
  //           cell[1] === 'clear' ? [0, 'clear'] : cell
  //         )
  //       )
  //       console.log(newStage)

  //     return newStage
  //   }

  //   setStage((prev: Stage) => updatedStage(prev))
  // }, [player])

  return { stage, setStage }
}

export default useStage