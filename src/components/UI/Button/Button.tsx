import React from 'react'
import cl from './button.module.css'

interface ButtonProps {
  text: string,
  action: Function
  styles?: Object
}

const Button: React.FC<ButtonProps> = ({text, action, styles}) => {
  return (
    <button
      className={cl.button}
      onClick={(e) => action(e)}
      style={styles}
    >
      { text }
    </button>
  )
}

export default Button