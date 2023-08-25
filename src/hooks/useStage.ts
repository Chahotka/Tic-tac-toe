import { useState } from 'react'
import { stages } from '../gameHelpers'
import { StageInterface } from '../interfaces/StageInterface'

const useStage = () => {
  const [stage, setStage] = useState<StageInterface[]>(stages)

  return { stage, setStage }
}

export default useStage