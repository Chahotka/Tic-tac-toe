import React from 'react'
import cl from '../../styles/figure.module.css'
import { TFigure } from '../../interfaces/ContextInterface'

interface FigureProps {
  figure: string | number
}

const Figure: React.FC<FigureProps> = ({figure}) => {

  return (
    <p className={cl.figure} style={{color: '#fff'}}>
      { figure === 0 ? '' : figure}
    </p>
  )
}

export default Figure