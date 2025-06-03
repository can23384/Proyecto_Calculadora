import React from 'react'

export default function Display ({ value, displayRef }) {
  return (
    <div
      className='calculator-display'
      ref={displayRef}
      data-testid='display'        // ← Agregado aquí
    >
      {value}
    </div>
  )
}
