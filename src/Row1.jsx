import React from 'react'
import CalcButton from './CalcButton'

export default function Row1 ({ handleClick }) {
  return (
    <>
      <CalcButton value='clear' keyCode='67' onClick={handleClick}>C</CalcButton>
      <CalcButton value='toggle' keyCode='84' onClick={handleClick}>+/-</CalcButton>
      <CalcButton value='modulo' keyCode='88' onClick={handleClick}>mod</CalcButton>
      <CalcButton value='div' keyCode='47' onClick={handleClick}>÷</CalcButton>
    </>
  )
}
