import { keyCalculatorMode, keyHandler, appendInput } from './keys.js'
import { equals } from './operators.js'
import { addListeners } from './listeners.js'


//////////////////////////////////////////////////////////////////
// Script Variables
//////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////
// Code
//////////////////////////////////////////////////////////////////

//////////////////////////////////////
// add functions to key dictionaries
//////////////////////////////////////

// launch equals function when '=' or 'Enter' is pressed
keyCalculatorMode['='].keyup = [equals]
keyCalculatorMode['='].mouseup = [equals]
keyCalculatorMode['Enter'].keyup = [equals]
keyCalculatorMode['Enter'].mouseup = [equals]

// for all other keys, use the appendInput function
for (const key of Object.keys(keyCalculatorMode)) {
  if (!keyCalculatorMode[key].keyup) keyCalculatorMode[key].keyup = [appendInput];
  if (!keyCalculatorMode[key].mouseup) keyCalculatorMode[key].mouseup = [appendInput];
}

console.log(keyCalculatorMode)

addListeners(keyHandler, "keyup", "mouseup");
