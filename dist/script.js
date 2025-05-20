let calculator = {
  data: {
    maxChars: 9, // CAMBIADO DE 10 A 9
    storedResult: null,
    currentValue: '0',
    currentOperation: null,

    mapKeys: {
      48 : { type: 'input', value: '0' },
      49 : { type: 'input', value: '1' },
      50 : { type: 'input', value: '2' },
      51 : { type: 'input', value: '3' },
      52 : { type: 'input', value: '4' },
      53 : { type: 'input', value: '5' },
      54 : { type: 'input', value: '6' },
      55 : { type: 'input', value: '7' },
      56 : { type: 'input', value: '8' },
      57 : { type: 'input', value: '9' },
      190: { type: 'input', value: '.' },
      88 : { type: 'operation', value: 'modulo' },
      47 : { type: 'operation', value: 'division' },
      221: { type: 'operation', value: 'multiply' },
      189: { type: 'operation', value: 'subtract' },
      187: { type: 'operation', value: 'sum' },
      67 : { type: 'clear', value: 'clear' },
      13 : { type: 'result', value: null },
      8  : { type: 'delete', value: null },
      84 : { type: 'toggle', value: 'toggle' },
    },
  },

  activateButtonWithKeypress(keyCode) {
    const chooseBtn = document.querySelectorAll(`.calculator button[data-keycode="${keyCode}"]`)[0];
    if (chooseBtn) {
      chooseBtn.classList.toggle('active');
      setTimeout(() => {
        chooseBtn.classList.toggle('active');
      }, 150);
    }
  },

  bindButtons() {
    const buttons = document.querySelectorAll('.calculator button');
    const mapKeys = calculator.data.mapKeys;
    Array.from(buttons).forEach((button) => {
      button.addEventListener('click', (event) => {
        this.processUserInput(mapKeys[event.target.dataset.keycode])
      });
    });
  },

  bindKeyboard() {
    document.addEventListener('keydown', (event) => {
      const mapKeys = calculator.data.mapKeys;
      let keyCode = event.keyCode;

      if (keyCode === 55 && event.shiftKey) {
        keyCode = 47;
      }
      if (mapKeys[keyCode]) {
        this.processUserInput(mapKeys[keyCode])
        this.activateButtonWithKeypress(keyCode)
      }
    });
  },

  blinkDisplay() {
    const blinkDisplay = document.querySelector('.calculator-display');
    blinkDisplay.classList.toggle('blink');
    setTimeout(() => {
      blinkDisplay.classList.toggle('blink');
    }, 150);
  },

  calculate() {
  const oldValue = parseFloat(this.data.storedResult, 10);
  const newValue = parseFloat(this.data.currentValue, 10);
  let resultValue = 0;

  if (this.data.currentOperation === 'multiply') {
    resultValue = oldValue * newValue;
  }
  if (this.data.currentOperation === 'division') {
    resultValue = oldValue / newValue;
  }
  if (this.data.currentOperation === 'subtract') {
    resultValue = oldValue - newValue;
  }
  if (this.data.currentOperation === 'sum') {
    const multiplierFix = 1000000000;
    resultValue = (((oldValue * multiplierFix) + (newValue * multiplierFix)) / multiplierFix);
  }
  if (this.data.currentOperation === 'exponent') {
    resultValue = Math.pow(oldValue, newValue);
  }

  if (this.data.currentOperation === 'modulo') {
  if (newValue === 0) {
    this.data.currentValue = 'ERROR';
    this.data.storedResult = null;
    return;
  }
  resultValue = oldValue % newValue;
}



  // Validar rango permitido
  if (resultValue < 0 || resultValue > 999999999) {
    this.data.currentValue = 'ERROR';
    this.data.storedResult = null;
    return;
  }

  // Convertimos a string para validar su longitud
  let resultStr = resultValue.toString();

  if (resultStr.length > this.data.maxChars) {
    const integerPartLength = Math.floor(resultValue).toString().length;

    // Si la parte entera ya supera el límite, no se puede mostrar
    if (integerPartLength > this.data.maxChars) {
      this.data.currentValue = 'ERROR';
      this.data.storedResult = null;
      return;
    }

    // Calculamos cuántos decimales podemos mostrar
    let maxDecimals = this.data.maxChars - integerPartLength - 1; // 1 char for decimal point

    if (maxDecimals < 1) {
      maxDecimals = 1; // Mostrar al menos 1 decimal si hay espacio
    }

    // Redondeamos el resultado
    resultValue = resultValue.toFixed(maxDecimals);
    resultStr = resultValue.toString();

    // En caso extremo, recortar si todavía se pasa (evita .00000001 errores)
    if (resultStr.length > this.data.maxChars) {
      resultStr = resultStr.slice(0, this.data.maxChars);
    }
  }

  this.data.currentValue = resultStr;
  this.data.storedResult = null;
  this.updateDisplay();
},



  clearAll() {
    this.data.currentOperation = null;
    this.data.storedResult = null;
    this.data.currentValue = '0';
    this.updateDisplay();
  },

  clearCurrentValue() {
    this.data.currentValue = '0';
    this.updateDisplay();
  },

  deleteNumber() {
    const newValue = this.data.currentValue.slice(0, -1);
    if (newValue === '') {
      this.blinkDisplay();
      this.clearCurrentValue();
    } else {
      this.data.currentValue = newValue;
      this.updateDisplay();
    }
  },

  processUserInput(userInput) {
    if (userInput.type === 'input') {
      this.setNumber(userInput.value)
    }
    if (userInput.type === 'operation') {
      this.setOperation(userInput.value)
    }
    if (userInput.type === 'delete') {
      this.deleteNumber();
    }
    if (userInput.type === 'result') {
      this.showResult();
    }
    if (userInput.type === 'clear') {
      this.clearAll();
    }
    if (userInput.type === 'toggle') {
      this.toggleNumber();
    }
  },

  setNumber(newNumber) {
  let currentValue = this.data.currentValue;

  // Si hay ERROR, reiniciar
  if (currentValue === 'ERROR') {
    currentValue = newNumber === '.' ? '0.' : newNumber;
    this.data.currentValue = currentValue;
    this.updateDisplay();
    return;
  }

  // Validar que no haya dos puntos
  if (newNumber === '.' && currentValue.includes('.')) {
    this.blinkDisplay();
    return;
  }

  // ✅ Validar longitud total (punto cuenta como carácter)
  if (currentValue.length === this.data.maxChars) {
    this.blinkDisplay();
    return;
  }

  if (currentValue === '0' && newNumber === '.') {
    currentValue = '0.';
  } else if (currentValue === '0' && newNumber !== '.') {
    currentValue = newNumber;
  } else {
    currentValue += newNumber;
  }

  this.data.currentValue = currentValue;
  this.updateDisplay();
}
,


  setOperation(newOperation) {
    if (this.data.currentOperation !== null && this.data.storedResult !== null) {
      this.calculate();
    }
    this.data.storedResult = this.data.currentValue;
    this.data.currentValue = '0';
    this.data.currentOperation = newOperation;
  },

  showResult() {
    if (this.data.storedResult !== null) {
      this.calculate();
      this.updateDisplay();
    } else {
      this.blinkDisplay();
    }
  },

  toggleNumber() {
  let currentValue = this.data.currentValue;

  if (currentValue === 'ERROR') return;

  // Si es cero, no hacer nada
  if (currentValue === '0') return;

  // Alternar el signo
  if (currentValue.startsWith('-')) {
    currentValue = currentValue.slice(1); // quitar el signo negativo
  } else {
    // Verificar si agregar el signo excede el límite de caracteres
    if (currentValue.length + 1 > this.data.maxChars) {
      this.blinkDisplay();
      return;
    }
    currentValue = '-' + currentValue;
  }

  this.data.currentValue = currentValue;
  this.updateDisplay();
},


  updateDisplay() {
    document.querySelector('.calculator-display').innerHTML = this.data.currentValue;
  },

  start() {
    this.updateDisplay();
    this.bindKeyboard();
    this.bindButtons();
  },
};

calculator.start();
