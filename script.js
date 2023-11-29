let calcMode = true;

const inputString = {
  text: "",
  equationStart: [0],
  textMode: null,
  calcMode: document.querySelector(".screen-row.input.calc-mode"),
  calcArray: [],
  calcIndex: [],
};

const calcOutput = document.querySelector('.screen-row.output');

const operators = {
  "+": add,
  "-": subtract,
  "/": divide,
  "*": multiply,
};

const keyCalculatorMode = {
  '0': {
    keydown: [null],
    keyup: [appendInput],
  },
  '1': {
    keydown: [null],
    keyup: [appendInput],
  },
  '2': {
    keydown: [null],
    keyup: [appendInput],
  },
  '3': {
    keydown: [null],
    keyup: [appendInput],
  },
  '4': {
    keydown: [null],
    keyup: [appendInput],
  },
  '5': {
    keydown: [null],
    keyup: [appendInput],
  },
  '6': {
    keydown: [null],
    keyup: [appendInput],
  },
  '7': {
    keydown: [null],
    keyup: [appendInput],
  },
  '8': {
    keydown: [null],
    keyup: [appendInput],
  },
  '9': {
    keydown: [null],
    keyup: [appendInput],
  },
  "+": {
    keydown: [null],
    keyup: [appendInput],
  },
  "-": {
    keydown: [null],
    keyup: [appendInput],
  },
  "*": {
    keydown: [null],
    keyup: [appendInput],
  },
  "/": {
    keydown: [null],
    keyup: [appendInput],
  },
  "=": {
    keydown: [null],
    keyup: [equals],
  },
  "Enter": {
    keydown: [null],
    keyup: [equals],
  },
};

addListeners(keyCalculatorMode, "keyup");

function keyHandler(evt) {
  // console.log(evt);
  if (evt.repeat) return;
  if (!(evt.key in keyCalculatorMode)) return;
  if (!(evt.type in keyCalculatorMode[evt.key])) return;
  keyCalculatorMode[evt.key][evt.type].forEach((fn) => fn(evt.key));
}

function addListeners(listeners, ...events) {
  [...events].forEach((evt) => document.body.addEventListener(evt, keyHandler));
}

function removeListeners(...events) {
  [...events].forEach((evt) =>
    document.body.removeEventListener(evt, keyHandler),
  );
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

function appendInput(char) {
  if (!char) return;
  
  const calcArray = inputString.calcArray;
  const lastIndex = calcArray.length - 1;

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
  // if (char in operators && !(calcArray[lastIndex] in operators)) {
  //   calcArray.push(char);
  // } else if (lastIndex >= 0) {
  //   calcArray[lastIndex] += char;
  // } else {
  //   calcArray.push(char);
  // }
}

function generateCalc(operatorIndex) {
  const leftOperand = inputString.calcArray[operatorIndex-1];
  const rightOperand = inputString.calcArray[operatorIndex+1];
  const input = inputString.calcArray[operatorIndex];
  // run the calc algorithm then replace the calculation pattern with the answer
  inputString.calcArray.splice(operatorIndex-1, 3, operators[input](leftOperand, rightOperand))
}

function equals() {
  // launch w/ equal / enter /close-parenthesis

  // do multiplication and division first
  let opIndex = -1
  do {
    opIndex = inputString.calcArray.indexOf("*")
      if (opIndex !== -1) generateCalc(opIndex)
    }
  while (opIndex !== -1)

  do {
    opIndex = inputString.calcArray.indexOf("/")
      if (opIndex !== -1) generateCalc(opIndex)
    }
  while (opIndex !== -1)


  // now addition and subtraction
  do {
    opIndex = inputString.calcArray.indexOf("+")
      if (opIndex !== -1) generateCalc(opIndex)
    }
  while (opIndex !== -1)

  do {
    opIndex = inputString.calcArray.indexOf("-")
      if (opIndex !== -1) generateCalc(opIndex)
    }
  while (opIndex !== -1)

  // print the output
  console.log(inputString.calcArray);
  calcOutput.textContent = inputString.calcArray.join(' ');

  // clear the calc array
  inputString.calcArray.length = 0

}

function add(a, b) {return +a + +b}
function subtract(a, b) {return +a - +b}
function divide(a, b) {return a / b}
function multiply(a, b) {return a * b}
function exponent() {}
