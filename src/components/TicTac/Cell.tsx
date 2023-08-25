import React from 'react'
import cl from '../../styles/cell.module.css'
import { StageInterface } from '../../interfaces/StageInterface'

interface CellProps {
  cell: StageInterface
  stage: StageInterface[]
}

const Cell: React.FC<CellProps> = ({cell, stage}) => {
  return (
    <li className={cl.cell}>
    </li>
  )
}

export default Cell