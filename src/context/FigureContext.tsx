import { createContext, useState } from 'react'
import { ContextInterface, TFigure } from '../interfaces/ContextInterface'

export const FigureContext = createContext<ContextInterface>({
  figure: 'x',
  setFigure: () => {}
})

interface ProviderProps {
  children: React.ReactNode
}

const FigureProvider: React.FC<ProviderProps> = ({children}) => {
  const [figure, setFigure] = useState<TFigure>('x')

  return (
    <FigureContext.Provider
      value={{
        figure,
        setFigure
      }}
    >
      { children }
    </FigureContext.Provider>
  )
}

export default FigureProvider