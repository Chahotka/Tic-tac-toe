import { useState, useEffect } from 'react'
import { Stages, checkGameover } from "../gameHelpers"

const useGameover = (
  stage: Stages,
  tCount: number,
) => {
  const [gameover, setGameover] = useState(false)

  useEffect(() => {
    checkGameover(stage, setGameover, tCount)
  }, [stage])

  return { gameover, setGameover }
}

export default useGameover