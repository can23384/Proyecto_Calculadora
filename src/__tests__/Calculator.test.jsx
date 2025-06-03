// src/__tests__/Calculator.test.jsx

import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Calculator from '../Calculator'
import '@testing-library/jest-dom'

describe('Calculator Functional Tests', () => {
  it('should perform chained operations: 2 + 3 × 4 = 12 (secuencial)', async () => {
    render(<Calculator />)
    const user = userEvent.setup()

    await user.click(screen.getByText('2'))
    await user.click(screen.getByText('+'))
    await user.click(screen.getByText('3'))
    await user.click(screen.getByText('×'))
    await user.click(screen.getByText('4'))
    await user.click(screen.getByText('='))

    // Con la lógica actual, calcula primero 3×4 = 12 y muestra “12”.
    expect(screen.getByTestId('display')).toHaveTextContent('12')
  })

  it('should clear display when C is pressed', async () => {
    render(<Calculator />)
    const user = userEvent.setup()

    await user.click(screen.getByText('9'))
    await user.click(screen.getByText('C'))

    expect(screen.getByTestId('display')).toHaveTextContent('0')
  })

  it('should handle multiple decimal points correctly', async () => {
    render(<Calculator />)
    const user = userEvent.setup()

    await user.click(screen.getByText('3'))
    await user.click(screen.getByText('.'))
    await user.click(screen.getByText('1'))
    await user.click(screen.getByText('.'))
    await user.click(screen.getByText('4'))

    // El segundo punto no debe agregarse, por lo que el display queda “3.14”
    expect(screen.getByTestId('display')).toHaveTextContent('3.14')
  })

  it('should toggle sign when +/- is pressed', async () => {
    render(<Calculator />)
    const user = userEvent.setup()

    await user.click(screen.getByText('7'))
    await user.click(screen.getByText('+/-'))

    // El toggle de signo se aplica de inmediato. No esperamos timers adicionales.
    expect(screen.getByTestId('display')).toHaveTextContent('-7')

    await user.click(screen.getByText('+/-'))

    expect(screen.getByTestId('display')).toHaveTextContent('7')
  })

  it('should compute modulo operation correctly: 9 % 4 = 1', async () => {
    render(<Calculator />)
    const user = userEvent.setup()

    await user.click(screen.getByText('9'))
    await user.click(screen.getByText('mod'))
    await user.click(screen.getByText('4'))
    await user.click(screen.getByText('='))

    expect(screen.getByTestId('display')).toHaveTextContent('1')
  })
})
