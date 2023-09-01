import { useState, useEffect } from 'react'
import { Stages, checkGameover } from "../gameHelpers"
import { GameoverInterface } from '../interfaces/GameoverInterface'

const useGameover = (
  stage: Stages,
  tCount: number,
) => {
  const [gameover, setGameover] = useState<GameoverInterface>({over: false, reason: null})

  

  useEffect(() => {
    checkGameover(stage, gameover, setGameover, tCount)
  }, [stage])


  return { gameover, setGameover }
}

export default useGameover