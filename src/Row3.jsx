import React from 'react'
import CalcButton from './CalcButton'

export default function Row3 ({ handleClick }) {
  return (
    <>
      <CalcButton value='4' keyCode='52' onClick={handleClick}>4</CalcButton>
      <CalcButton value='5' keyCode='53' onClick={handleClick}>5</CalcButton>
      <CalcButton value='6' keyCode='54' onClick={handleClick}>6</CalcButton>
      <CalcButton value='subtract' keyCode='189' onClick={handleClick}>−</CalcButton>
    </>
  )
}
