import { operators, checkIsOperator } from './operators.js'


// export const inputString = {
//     text: "",
//     equationStart: [0],
//     textMode: null,
//     calcMode: document.querySelector(".screen-row.input.calc-mode"),
//     calcArray: [],
//     calcIndex: [],
//   };


export const calcInput = document.querySelector(".screen-row.input.calc-mode");
// export let inputString = ""; 
// export const calcArray = [];
export const pendingCalcs = [];

export const calcOutput = document.querySelector('.screen-row.output');
export const finishedCalcs = [];

export let calcMode = true;


//////////////////////////////////////////////////////////////////
// Functions
//////////////////////////////////////////////////////////////////

export function addOpenCalc(startPos = 0) {
  try {
    // if startPos isnt' a number, something's wrong
    if(typeof startPos !== 'number') throw `
      addCalcArray.data.js ERROR: startPos must be an integer! 
      Current value = ${startPos} 
      Current type = ${typeof startPos}
    `

    pendingCalcs.push({
      text: "",
      calcStart: startPos,
      calcEnd: null,
      calcArray: [],
      calcResult: null,
    })
  }
  catch (err) {
    console.log(err)
  }

}

export function addFinishedCalc(text, result) {

  finishedCalcs.push({
    text: text,
    result: result,
  })
}

export function appendOpenCalc(char) {
  // close a pending calc whenever close parentheses are used
  if (char === ')') {
    // can't start a calculation with a close parenthesis
    if (!getOpenCalc()) return;
    // setting calcEnd closes the calc,
    // function will add a new one if necessary
    processCalcArray(getOpenCalc());
    getOpenCalc().calcEnd = calcInput.textContent.length
    return;

    // NOTE, need to open prior calc when a parenthesis is closed!!!!!!!!
  }
  // start a pending calc if none exists yet
  if(!getOpenCalc()) addOpenCalc();

  // add to calc array and input display
  appendCalc(char);

  // start a new pending calc whenever open parentheses are used
  if (char === '(') addOpenCalc(calcInput.textContent.length)
}

function getOpenCalc() {
  // if no open calcs, return false
  if(pendingCalcs.length === 0) return false;

  // check calc array for open calcs
  // return index of most recently created open calc, or false if none
  for (let i = pendingCalcs.length - 1; i >= 0; i--) {
    if (!pendingCalcs[i].calcEnd) return pendingCalcs[i];
  }
  return false;
}

function appendCalc(char) {
  // check for open calcs, use the master calc array otherwise
  const openCalc = getOpenCalc();
  const calcArray = openCalc.calcArray
  const lastIndex = calcArray.length - 1;

  // entry checks
  const isOperator = checkIsOperator(char);
  const isNewEntry = calcArray.length === 0 || checkIsOperator(calcArray[lastIndex]);
  if (isOperator && isNewEntry) return false;

  // add numbers to last entry, create new entries for operators
  if (isOperator || isNewEntry) {
    calcArray.push(char);
  } else {
    calcArray[lastIndex] += char;
  }

  // as long as the appension is valid, calc is 'ended' (ready for calc) 
  // if the last entry was not an operator
  openCalc.calcEnd = !isOperator

  // update the calcInput
  openCalc.text += char;
  calcInput.textContent += char;
  console.log(calcArray);

}

// export function appendInput(char) {
//   if (!char) return;

//   // check for open calcs, use the master calc array otherwise
//   const openCalc = getOpenCalc();
//   const calcArray = openCalc.calcArray
//   const calcString = openCalc.text
  
//   const lastIndex = calcArray.length - 1;

//   // clear the text input if the calc array is empty (don't forget to store these in an array for recalling)
//   if (calcArray.length === 0) calcInput.textContent = '';

//   // entry checks
//   const isOperator = checkIsOperator(char);
//   const isNewEntry =
//   calcArray.length === 0 || checkIsOperator(calcArray[lastIndex]);
//   if (isOperator && isNewEntry) return;

//   // add numbers to last entry, create new entries for operators
//   if (isOperator || isNewEntry) {
//     calcArray.push(char);
//   } else {
//     calcArray[lastIndex] += char;
//   }

//   // update the calcInput
//   calcString += char;
//   calcInput.textContent += char;
//   console.log(calcArray);
// }

function processCalcArray(openCalc) {
  // launch w/ equal / enter /close-parenthesis

  // order of operations is significant, so we
  // loop through the operator object in order
  const calcArray = openCalc.calcArray;

  for (let i = 1; i <= Object.keys(operators).length; i++) {
    for (const operator in operators) {
      if (operators[operator].order === i) {
        let opIndex = -1
        do {
          opIndex = calcArray.indexOf(operator)
            if (opIndex !== -1) generateCalc(calcArray, opIndex)
          }
        while (opIndex !== -1)
        break;
      }
    }
  }

  // print the output
  console.log(calcArray);
  openCalc.result = calcArray.join(' ');
  openCalc.calcEnd = calcInput.textContent.length

  // clear the calc array
  // inputString.calcArray.length = 0

}

function processPendingCalcs() {
  for (let i = pendingCalcs.length - 1; i >= 0; i--) {
    const j = i - 1;
    if (j < 0) return pendingCalcs[0].result;

    // replace '()' with result from next entry in pending calcs array

  }
}

function generateCalc(calcArray, operatorIndex) {
  const leftOperand = calcArray[operatorIndex-1];
  const rightOperand = calcArray[operatorIndex+1];
  const input = calcArray[operatorIndex];
  // run the calc algorithm then replace the calculation pattern with the answer
  calcArray.splice(operatorIndex-1, 3, operators[input].func(leftOperand, rightOperand))
}
