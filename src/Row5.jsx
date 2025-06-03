import React from 'react'
import CalcButton from './CalcButton'

export default function Row5 ({ handleClick }) {
  return (
    <>
      <CalcButton value='0' keyCode='48' onClick={handleClick} className='double'>0</CalcButton>
      <CalcButton value='.' keyCode='190' onClick={handleClick}>.</CalcButton>
      <CalcButton value='result' keyCode='13' onClick={handleClick}>=</CalcButton>
    </>
  )
}
