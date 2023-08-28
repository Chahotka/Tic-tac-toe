import React from 'react'
import cl from '../../styles/cell.module.css'

interface CellProps {
  cell: [string | number, string]
}

const Cell: React.FC<CellProps> = ({cell}) => {

  return (
    <>
      <li 
        className={cl.cell}
      >

      </li>
    </>
  )
}

export default Cell