import React from 'react'
import CalcButton from './CalcButton'

export default function Row2 ({ handleClick }) {
  return (
    <>
      <CalcButton value='7' keyCode='55' onClick={handleClick}>7</CalcButton>
      <CalcButton value='8' keyCode='56' onClick={handleClick}>8</CalcButton>
      <CalcButton value='9' keyCode='57' onClick={handleClick}>9</CalcButton>
      <CalcButton value='mult' keyCode='221' onClick={handleClick}>×</CalcButton>
    </>
  )
}
