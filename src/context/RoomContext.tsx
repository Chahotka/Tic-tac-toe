import { useState, createContext, useContext } from 'react'
import { RoomConInterface } from '../interfaces/RoomConInterface'

const RoomContext = createContext<RoomConInterface>({
  roomName: null,
  setRoomName: () => { },
  players: null,
  setPlayers: () => { }
})

export const useRoomContext = () => useContext(RoomContext)

interface RoomProps {
  children: React.ReactNode
}

export const RoomProvider: React.FC<RoomProps> = ({ children }) => {
  const [roomName, setRoomName] = useState<string | null>(null)
  const [players, setPlayers] = useState<number | null>(null)

  return (
    <RoomContext.Provider
      value={{
        roomName,
        setRoomName,
        players,
        setPlayers
      }}
    >
      {children}
    </RoomContext.Provider>
  )
}