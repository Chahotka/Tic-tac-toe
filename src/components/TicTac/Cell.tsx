import React from 'react'
import cl from '../../styles/cell.module.css'
import Figure from './Figure'

interface CellProps {
  cell: [string | number, string]
  tag: Function
}

const Cell: React.FC<CellProps> = ({cell, tag}) => {

  return (
    <>
      <li 
        className={cl.cell}
        onClick={() => tag(cell)}
      >
        <Figure figure={cell[0]}/>
      </li>
    </>
  )
}

export default Cell