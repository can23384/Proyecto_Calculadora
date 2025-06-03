import React from 'react'

export default function CalcButton ({ value, keyCode, onClick, className, children }) {
  return (
    <button value={value} data-keycode={keyCode} onClick={onClick} className={className}>
      {children}
    </button>
  )
}
