import { useState, useEffect } from 'react'
import { Stages, checkGameover } from "../gameHelpers"

const useGameover = (stage: Stages) => {
  const [gameover, setGameover] = useState(false)

  useEffect(() => {
    checkGameover(stage, setGameover)
  }, [stage])

  return { gameover }
}

export default useGameover