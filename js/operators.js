import { inputString, calcOutput } from './data.js'

//////////////////////////////////////////////////////////////////
// Exports
//////////////////////////////////////////////////////////////////

// operations, their order, and the function associated with them
export const operators = {
    "+": {
      func: add,
      order: 3,
    },
    "-": {
      func: subtract,
      order: 4,
    },
    "/": {
      func: divide,
      order: 2,
    },
    "*": {
      func: multiply,
      order: 1,
    },
  };


//////////////////////////////////////////////////////////////////
// Calculator functions
//////////////////////////////////////////////////////////////////

export function equals() {
  // launch w/ equal / enter /close-parenthesis

  // order of operations is significant, so we
  // loop through the operator object in order
  for (let i = 1; i <= Object.keys(operators).length; i++) {
    for (const operator in operators) {
      if (operators[operator].order === i) {
        let opIndex = -1
        do {
          opIndex = inputString.calcArray.indexOf(operator)
            if (opIndex !== -1) generateCalc(opIndex)
          }
        while (opIndex !== -1)
        break;
      }
    }
  }

  // print the output
  console.log(inputString.calcArray);
  calcOutput.textContent = inputString.calcArray.join(' ');

  // clear the calc array
  inputString.calcArray.length = 0

}

function generateCalc(operatorIndex) {
  const leftOperand = inputString.calcArray[operatorIndex-1];
  const rightOperand = inputString.calcArray[operatorIndex+1];
  const input = inputString.calcArray[operatorIndex];
  // run the calc algorithm then replace the calculation pattern with the answer
  inputString.calcArray.splice(operatorIndex-1, 3, operators[input].func(leftOperand, rightOperand))
}

//////////////////////////////////////////////////////////////////
// Operator functions
//////////////////////////////////////////////////////////////////

function add(a, b) {return +a + +b}

function subtract(a, b) {return +a - +b}

function divide(a, b) {return a / b}

function multiply(a, b) {return a * b}

function exponent() {}