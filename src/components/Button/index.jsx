import React from 'react'

import { ButtonContainer } from './styles';

const Button = ({title,variant = "primary", onClick, disabled= false}) => {
  return (
    <ButtonContainer variant={variant} onClick={onClick} disabled={disabled}>{title} </ButtonContainer>
  )
}

export { Button }
