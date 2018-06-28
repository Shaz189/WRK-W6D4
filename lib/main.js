const DOMNodeCollection = require('./dom_node_collection.js');
const fns = [];

Window.prototype.$l = function(arg) {
  if (typeof arg === 'string') {
    arr = document.querySelectorAll(arg);
    return new DOMNodeCollection(arr);
  } else if (arg instanceof HTMLElement) {
    return new DOMNodeCollection([arg]);
  } else if (typeof arg === 'function') {
    fns.push(arg);
  }
};

Window.prototype.$l.extend = function (...args) {
  let acc = args[0];
  args.slice(1).forEach(el => {
    acc = Object.assign(acc, el);
  });
  
  return acc;
};

Window.prototype.$l.ajax = function (options) {
  const defOptions = {
    method: "GET",
    url: "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=bcb83c4b54aee8418983c2aff3073b3b",
    data: {
      data: "ayyyye - fonzie"
    },
    success(data) {
      console.log("We have your weather!");
      console.log(data);
    },
    error() {
      console.error("An error occurred.");
    }    
  };
  options = $l.extend(defOptions, options);
  $l.ajaxRequest(options);
};

Window.prototype.$l.ajaxRequest = function (options) {
  var xhr = new XMLHttpRequest();
  xhr.open(options.method, options.url);
  
  xhr.onload = function () {
    console.log(xhr.status); // for status info
    console.log(xhr.responseType); //the type of data that was returned
    console.log(xhr.response); //the actual response. For JSON api calls, this will be a JSON string
    if (xhr.status === 200) {
      options.success(xhr.response);
    } else {
      options.error();
    }
  };
  
  xhr.send(null);
};


document.addEventListener("DOMContentLoaded", () => {
  fns.forEach(el => el());
});

// $.ajax({
//     type: 'GET',
//     url: "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=bcb83c4b54aee8418983c2aff3073b3b",
//     success(data) {
//       console.log("We have your weather!")
//       console.log(data);
//     },
//     error() {
//       console.error("An error occurred.");
//     },
//  });