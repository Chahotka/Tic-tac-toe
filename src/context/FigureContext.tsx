import { createContext, FC, ReactNode, useState } from 'react'
import { FigureInteface } from '../interfaces/FigureInterface'


export const FigureContext = createContext<FigureInteface>({
  figure: 'x', 
  setFigure: () => {}
})


type FigureProviderProps = {
  children: ReactNode
}

// figure присваивается объект

export const FigureProvider: FC<FigureProviderProps> = ({children}) => {
  const [figure, setFigure] = useState<FigureInteface>('x')

  return (
    <FigureContext.Provider
      value={figure}
    >
      { children }
    </FigureContext.Provider>
  )
}
