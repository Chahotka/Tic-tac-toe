import { useState, createContext, useContext } from 'react'
import { Player, PlayerConInterface } from '../interfaces/PlayerConInterface'

const PlayerContext = createContext<PlayerConInterface>({
  playerName: null,
  setPlayerName: () => {},
  lobby: null,
  setLobby: () => {}
})

export const usePlayerContext = () => useContext(PlayerContext)

interface PlayerProps {
  children: React.ReactNode
}

export const PlayerProvider: React.FC<PlayerProps> = ({children}) => {
  const [playerName, setPlayerName] = useState<string | null>(null)
  const [lobby, setLobby] = useState<Player[] | null>(null)

  console.log(playerName)

  return (
    <PlayerContext.Provider 
      value={{
        playerName, 
        setPlayerName,
        lobby,
        setLobby
      }}
    >
      { children }
    </PlayerContext.Provider>
  )
}