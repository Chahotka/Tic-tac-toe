import React, { useState, createContext, useContext } from 'react'
import { FigureConInterface, Figure } from '../interfaces/FigureConInterface'

const FigureContext = createContext<FigureConInterface>({
  figure: 'x',
  setFigure: () => {},
})

export const useFigureContext = () => useContext(FigureContext)

interface FigureProps {
  children: React.ReactNode
}

export const FigureProvider: React.FC<FigureProps> = ({ children }) => {
  const [figure, setFigure] = useState<Figure>('x')

  return (
    <FigureContext.Provider value={{ figure, setFigure }}>
      {children}
    </FigureContext.Provider>
  )
}