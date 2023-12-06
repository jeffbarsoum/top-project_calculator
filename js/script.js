import { keyCalculatorMode, keyHandler, appendInput, setKeys } from './keys.js'
import { equals } from './operators.js'
import { addListeners } from './listeners.js'


//////////////////////////////////////////////////////////////////
// Code
//////////////////////////////////////////////////////////////////
//////////////////////////////////////
// configure keys
//////////////////////////////////////

// number keys
setKeys(['0','1','2','3','4','5','6','7','8','9'], [appendInput], 'keyup', 'mouseup');

// operator keys
setKeys(['*','/','+','-'], [appendInput], 'keyup', 'mouseup');

// calculate keys
setKeys(['=','Enter'], [equals], 'keyup', 'mouseup');


//////////////////////////////////////
// add listeners
//////////////////////////////////////

addListeners(keyHandler, "keyup", "mouseup");
