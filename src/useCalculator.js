import { useState, useEffect, useRef } from 'react'

export default function useCalculator () {
  const maxChars = 9
  const [currentValue, setCurrentValue] = useState('0')
  const [storedResult, setStoredResult] = useState(null)
  const [currentOperation, setCurrentOperation] = useState(null)
  const displayRef = useRef(null)
  const mapKeys = {
    48: { type: 'input', value: '0' },
    49: { type: 'input', value: '1' },
    50: { type: 'input', value: '2' },
    51: { type: 'input', value: '3' },
    52: { type: 'input', value: '4' },
    53: { type: 'input', value: '5' },
    54: { type: 'input', value: '6' },
    55: { type: 'input', value: '7' },
    56: { type: 'input', value: '8' },
    57: { type: 'input', value: '9' },
    190: { type: 'input', value: '.' },
    88: { type: 'operation', value: 'modulo' },
    47: { type: 'operation', value: 'division' },
    221: { type: 'operation', value: 'multiply' },
    189: { type: 'operation', value: 'subtract' },
    187: { type: 'operation', value: 'sum' },
    67: { type: 'clear', value: 'clear' },
    13: { type: 'result', value: null },
    8: { type: 'delete', value: null },
    84: { type: 'toggle', value: 'toggle' }
  }

  function blinkDisplay () {
    if (process.env.NODE_ENV === 'test') return
    if (!displayRef.current) return
    displayRef.current.classList.toggle('blink')
    setTimeout(() => {
      if (displayRef.current) {
        displayRef.current.classList.toggle('blink')
      }
    }, 150)
  }

  function calculate () {
    const oldValue = parseFloat(storedResult, 10)
    const newValue = parseFloat(currentValue, 10)
    let resultValue = 0
    switch (currentOperation) {
      case 'multiply': resultValue = oldValue * newValue; break
      case 'division': resultValue = oldValue / newValue; break
      case 'subtract': resultValue = oldValue - newValue; break
      case 'sum': resultValue = (((oldValue * 1e9) + (newValue * 1e9)) / 1e9); break
      case 'modulo': if (newValue === 0) {
        setCurrentValue('ERROR')
        setStoredResult(null)
        return
      } resultValue = oldValue % newValue; break
      default: return
    }
    if (resultValue < 0 || resultValue > 999999999) { setCurrentValue('ERROR'); setStoredResult(null); return }
    let resultStr = resultValue.toString()
    if (resultStr.length > maxChars) {
      const intLen = Math.floor(resultValue).toString().length
      if (intLen > maxChars) { setCurrentValue('ERROR'); setStoredResult(null); return }
      let maxDec = maxChars - intLen - 1; if (maxDec < 1) maxDec = 1
      resultValue = resultValue.toFixed(maxDec)
      resultStr = resultValue.toString()
      if (resultStr.length > maxChars) resultStr = resultStr.slice(0, maxChars)
    }
    setCurrentValue(resultStr)
    setStoredResult(null)
    setCurrentOperation(null)
  }

  function clearAll () { setCurrentOperation(null); setStoredResult(null); setCurrentValue('0') }
  function toggleNumber () {
    if (currentValue === 'ERROR' || currentValue === '0') return
    if (currentValue.startsWith('-')) setCurrentValue(currentValue.slice(1))
    else if (currentValue.length + 1 <= maxChars) setCurrentValue('-' + currentValue)
    else blinkDisplay()
  }
  function deleteNumber () {
    if (currentValue === 'ERROR') { clearAll(); blinkDisplay(); return }
    const newVal = currentValue.slice(0, -1)
    if (newVal === '' || newVal === '-') { clearAll(); blinkDisplay() } else setCurrentValue(newVal)
  }
  function setNumber (newNum) {
    let cv = currentValue
    if (cv === 'ERROR') { cv = newNum === '.' ? '0.' : newNum; setCurrentValue(cv); return }
    if (newNum === '.' && cv.includes('.')) { blinkDisplay(); return }
    if (cv.length === maxChars) { blinkDisplay(); return }
    if (cv === '0' && newNum !== '.') cv = newNum
    else if (cv === '0' && newNum === '.') cv = '0.'
    else cv += newNum
    setCurrentValue(cv)
  }
  function setOperation (op) {
    if (currentOperation && storedResult) calculate()
    setStoredResult(currentValue)
    setCurrentValue('0')
    setCurrentOperation(op)
  }
  function showResult () { if (storedResult) calculate(); else blinkDisplay() }
  function handleButtonClick (e) {
    const val = e.target.value
    if (val === 'clear') clearAll()
    else if (val === 'toggle') toggleNumber()
    else if (['modulo', 'div', 'mult', 'subtract', 'sum'].includes(val)) {
      const ops = { div: 'division', mult: 'multiply', subtract: 'subtract', sum: 'sum', modulo: 'modulo' }
      setOperation(ops[val])
    } else if (val === 'result') showResult()
    else if (/^[0-9.]$/.test(val)) setNumber(val)
  }
  function handleKeyDown (event) {
    let kc = event.keyCode
    if (kc === 55 && event.shiftKey) kc = 47
    const map = mapKeys[kc]
    if (map) {
      event.preventDefault()
      if (map.type === 'input') setNumber(map.value)
      else if (map.type === 'operation') setOperation(map.value)
      else if (map.type === 'result') showResult()
      else if (map.type === 'clear') clearAll()
      else if (map.type === 'delete') deleteNumber()
      else if (map.type === 'toggle') toggleNumber()
      const btn = document.querySelector(`.calculator button[data-keycode="${kc}"]`)
      if (btn) { btn.classList.toggle('active'); setTimeout(() => btn.classList.toggle('active'), 150) }
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => { document.removeEventListener('keydown', handleKeyDown) }
  })

  return { currentValue, displayRef, handleButtonClick }
}
