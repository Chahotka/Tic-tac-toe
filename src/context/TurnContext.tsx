import { useState, createContext, useContext } from 'react'
import { Turn, TurnConInterface } from '../interfaces/TurnConInterface'

const TurnContext = createContext<TurnConInterface>({
  turn: 'x',
  setTurn: () => {}
})

export const useTurnContext = () => useContext(TurnContext)

interface TurnProps {
  children: React.ReactNode
}

export const TurnProvider: React.FC<TurnProps> = ({children}) => {
  const [turn, setTurn] = useState<Turn>('x')
  
  return (
    <TurnContext.Provider value={{turn, setTurn}}>
      { children }
    </TurnContext.Provider>
  )
}