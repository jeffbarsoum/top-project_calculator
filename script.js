let calcMode = true;

const inputString = {
  text: "",
  equationStart: [0],
  textMode: null,
  calcMode: document.querySelector(".screen-row.input.calc-mode"),
  calcArray: [],
  calcIndex: [],
};

const operators = {
  "+": add(),
  "-": subtract(),
  "/": divide(),
  "*": multiply(),
};

const keyCalculatorMode = {
  0: {
    keydown: [null],
    keyup: [appendInput],
  },
  1: {
    keydown: [null],
    keyup: [appendInput],
  },
  2: {
    keydown: [null],
    keyup: [appendInput],
  },
  3: {
    keydown: [null],
    keyup: [appendInput],
  },
  4: {
    keydown: [null],
    keyup: [appendInput],
  },
  5: {
    keydown: [null],
    keyup: [appendInput],
  },
  6: {
    keydown: [null],
    keyup: [appendInput],
  },
  7: {
    keydown: [null],
    keyup: [appendInput],
  },
  8: {
    keydown: [null],
    keyup: [appendInput],
  },
  9: {
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
};

addListeners(keyCalculatorMode, "keyup");

function keyHandler(evt) {
  console.log(evt);
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
  console.log(inputString.calcArray);
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
  // if (char in operators && !(calcArray[lastIndex] in operators)) {
  //   calcArray.push(char);
  // } else if (lastIndex >= 0) {
  //   calcArray[lastIndex] += char;
  // } else {
  //   calcArray.push(char);
  // }
}

function generateCalc() {
  const start =
    inputString.lastIndexOf("(") ??
    inputString.lastIndexOf("[") ??
    inputString.lastIndexOf("{");

  inputString.calcArray.unshift({
    startIndex: inputString.text.length,
    startChar: inputString.text.slice(-1),
    endIndex: null,
    operation: null,
  });
}

function equals() {
  // launch w/ equal / enter /close-parenthesis
  // do multiplication and division first
}

function add() {}
function subtract() {}
function divide() {}
function multiply() {}
function exponent() {}
