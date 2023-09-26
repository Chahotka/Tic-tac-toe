import { useState, createContext, useContext } from 'react'
import { PlayerConInterface } from '../interfaces/PlayerConInterface'

const PlayerContext = createContext<PlayerConInterface>({
  playerName: null,
  setPlayerName: () => {}
})

export const usePlayerContext = () => useContext(PlayerContext)

interface PlayerProps {
  children: React.ReactNode
}

export const PlayerProvider: React.FC<PlayerProps> = ({children}) => {
  const [playerName, setPlayerName] = useState<string | null>(null)

  return (
    <PlayerContext.Provider value={{playerName, setPlayerName}}>
      { children }
    </PlayerContext.Provider>
  )
}