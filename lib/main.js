const DOMNodeCollection = require('./dom_node_collection.js');

Window.prototype.$l = function(arg) {
  // debugger
  if (typeof arg === 'string') {
    arr = document.querySelectorAll(`${arg}`);
    return new DOMNodeCollection(arr);
  } else if (arg instanceof HTMLElement) {
    return new DOMNodeCollection(arg);
    
  }
};
