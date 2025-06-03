import React from 'react'
import Row1 from './Row1'
import Row2 from './Row2'
import Row3 from './Row3'
import Row4 from './Row4'
import Row5 from './Row5'

export default function Keyboard ({ handleClick }) {
  return (
    <div className='calculator-keyboard'>
      <Row1 handleClick={handleClick} />
      <Row2 handleClick={handleClick} />
      <Row3 handleClick={handleClick} />
      <Row4 handleClick={handleClick} />
      <Row5 handleClick={handleClick} />
    </div>
  )
}
