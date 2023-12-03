import { operators } from './operators.js'
import { inputString } from './data.js'

//////////////////////////////////////////////////////////////////
// Exported dictionaries
//////////////////////////////////////////////////////////////////

// functions to run for each event associated with a key input from the user,
// in order

export const keyCalculatorMode = {
    '0': {},
    '1': {},
    '2': {},
    '3': {},
    '4': {},
    '5': {},
    '6': {},
    '7': {},
    '8': {},
    '9': {},
    "+": {},
    "-": {},
    "*": {},
    "/": {},
    "=": {},
    "Enter": {},
  }


//////////////////////////////////////////////////////////////////
// Functions
//////////////////////////////////////////////////////////////////

export function keyHandler(evt) {
  console.log(evt);
  const isButton = evt.target.nodeName === 'BUTTON';
  const key = evt.type === 'keyup' ? evt.key : isButton ? evt.target.dataset.key : null;

  if (!key) return;
  if (evt.repeat) return;
  if (!(key in keyCalculatorMode)) return;
  if (!(evt.type in keyCalculatorMode[key])) return;

  keyCalculatorMode[key][evt.type].forEach((fn) => fn(key));
}

export function appendInput(char) {
  if (!char) return;
  
  const calcArray = inputString.calcArray;
  const lastIndex = calcArray.length - 1;

  // clear the text input if the calc array is empty (don't forget to store these in an array for recalling)
  if (calcArray.length === 0) inputString.calcMode.textContent = '';

  const isOperator = char in operators;
  const isNewEntry =
    calcArray.length === 0 || calcArray[lastIndex] in operators;
  if (isOperator && isNewEntry) return;

  if (isOperator || isNewEntry) {
    calcArray.push(char);
  } else {
    calcArray[lastIndex] += char;
  }

  inputString.calcMode.textContent += char;
  console.log(inputString.calcArray);
}

function toggleCalcMode() {
  calcMode = !calcMode;
  // create text input if it doesn't exist yet (only happens once)
  if (!inputString.textMode) {
    const textInput = document.createElement("input");
    textInput.setAttribute("type", "text");
    textInput.classList.add(["screen-row", "input", "text-mode"]);
    inputString.textMode = textInput;
  }
  if (calcMode) {
    document.replaceChild(inputString.calcMode, inputString.textMode);
  } else {
    document.replaceChild(inputString.textMode, inputString.calcMode);
  }
}