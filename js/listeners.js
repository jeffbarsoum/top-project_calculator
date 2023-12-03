//////////////////////////////////////////////////////////////////
// Functions
//////////////////////////////////////////////////////////////////

export function addListeners(keyHandler, ...events) {
    [...events].forEach((evt) => document.body.addEventListener(evt, keyHandler));
  }
  
export  function removeListeners(keyHandler, ...events) {
    [...events].forEach((evt) =>
      document.body.removeEventListener(evt, keyHandler),
    );
  }
  
  

  

  
