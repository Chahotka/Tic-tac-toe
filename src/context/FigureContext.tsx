import { createContext, useState } from 'react'
import { ContextInterface, TFigure } from '../interfaces/ContextInterface'

export const FigureContext = createContext<ContextInterface>({
  room: null,
  setRoom: () => {},
  figure: 'x',
  setFigure: () => {}
})

interface ProviderProps {
  children: React.ReactNode
}

const FigureProvider: React.FC<ProviderProps> = ({children}) => {
  const [room, setRoom] = useState<string | null>(null)
  const [figure, setFigure] = useState<TFigure>('x')

  return (
    <FigureContext.Provider
      value={{
        room,
        setRoom,
        figure,
        setFigure
      }}
    >
      { children }
    </FigureContext.Provider>
  )
}

export default FigureProvider