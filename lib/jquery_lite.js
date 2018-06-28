/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/dom_node_collection.js":
/*!************************************!*\
  !*** ./lib/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DOMNodeCollection {\n  constructor(arrHTML) {\n    this.arrHTML = arrHTML;\n    this.cbData = {};\n  }\n  \n  html (string) {\n    if (!string) {\n      return this.arrHTML[0];\n    } else {\n      this.arrHTML.forEach((el) =>{\n        el.innerHTML = string;\n      });\n    }\n  }\n  \n  empty() {\n    this.arrHTML.forEach((el) =>{\n      el.innerHTML = '';\n    });\n  }\n  \n  append(arg) {\n    if (arg instanceof HTMLElement) {\n      this.arrHTML.forEach((el) => {\n        el.innerHTML += arg.outerHTML;\n      });\n      \n    } else if (arg instanceof DOMNodeCollection){\n      arg.arrHTML.forEach ( (el) => {\n\n        this.append(arg);\n      });\n      \n    } else if (typeof arg === 'string') {\n      this.arrHTML.forEach((el) => {\n        el.innerHTML += arg;\n      });\n      \n    } else {\n      console.log('ERROR');\n    }\n  }\n  \n  attr(key, val) {\n    if (val) {\n      this.arrHTML[0].setAttribute(`${key}`, val);\n    } else {\n      return this.arrHTML[0].attributes[`${key}`];\n    }\n  }\n  \n  addClass(val) {\n    this.arrHTML.forEach ( (el) => {\n      let attrVal = el.attributes[`class`].value += ` ${val}`;\n    });\n  }\n  \n  removeClass(val) {\n    this.arrHTML.forEach ( el => {\n      let attrVal = el.attributes[`class`].value;\n      const splitVal = attrVal.split(\" \");\n      const newClasses = splitVal.filter((el) => el !== val);\n      el.attributes[`class`].value = newClasses.join(' ');\n    });\n    this.attr(\"class\", \"\");\n  }\n  \n  children() {\n    const childrenArr = [];\n    \n    this.arrHTML.forEach((parent) => {\n      for (let i = 0; i < parent.children.length; i++) {\n        const domNode = new DOMNodeCollection(parent.children[i]);\n        childrenArr.push(domNode);\n      }\n    });\n    return childrenArr;\n  }\n  \n  parent() {\n    const parentArr = [];\n    \n    this.arrHTML.forEach((child) => {\n      parentArr.push(child.parentElement); \n    });\n    \n    const uniq = [];\n    parentArr.forEach((el) => { \n      if (!uniq.includes(el)) { \n        uniq.push(el); \n      }\n    });\n    \n    return uniq;\n  }\n  \n  find (arg) {\n    const result = [];\n    this.arrHTML.forEach((el) => {\n      result.push(el.querySelectorAll(`${arg}`));\n    });\n    \n    return result;\n  }\n  \n  remove(arr){\n    this.arrHTML.forEach((el) => {\n      el.remove();\n    });\n  }\n  \n  on(method, cb) {\n    let that = this;\n    this.arrHTML.forEach((el, idx) => {\n      el[idx] = cb;\n      el.addEventListener(method, cb);\n    });\n  }\n  \n  off(method) {\n    let that = this;\n    this.arrHTML.forEach((el, idx) => {\n      el.removeEventListener(method, el[idx]);\n    });\n  }\n  \n  \n  \n}\n\nmodule.exports = DOMNodeCollection;\n\n\n//# sourceURL=webpack:///./lib/dom_node_collection.js?");

/***/ }),

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection.js */ \"./lib/dom_node_collection.js\");\nconst fns = [];\n\nWindow.prototype.$l = function(arg) {\n  if (typeof arg === 'string') {\n    arr = document.querySelectorAll(arg);\n    return new DOMNodeCollection(arr);\n  } else if (arg instanceof HTMLElement) {\n    return new DOMNodeCollection([arg]);\n  } else if (typeof arg === 'function') {\n    fns.push(arg);\n  }\n};\n\nWindow.prototype.$l.extend = function (...args) {\n  let acc = args[0];\n  args.slice(1).forEach(el => {\n    acc = Object.assign(acc, el);\n  });\n  \n  return acc;\n};\n\nWindow.prototype.$l.ajax = function (options) {\n  const defOptions = {\n    method: \"GET\",\n    url: \"http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=bcb83c4b54aee8418983c2aff3073b3b\",\n    data: {\n      data: \"ayyyye - fonzie\"\n    },\n    success(data) {\n      console.log(\"We have your weather!\");\n      console.log(data);\n    },\n    error() {\n      console.error(\"An error occurred.\");\n    }    \n  };\n  options = $l.extend(defOptions, options);\n  $l.ajaxRequest(options);\n};\n\nWindow.prototype.$l.ajaxRequest = function (options) {\n  var xhr = new XMLHttpRequest();\n  xhr.open(options.method, options.url);\n  \n  xhr.onload = function () {\n    console.log(xhr.status); // for status info\n    console.log(xhr.responseType); //the type of data that was returned\n    console.log(xhr.response); //the actual response. For JSON api calls, this will be a JSON string\n    if (xhr.status === 200) {\n      options.success(xhr.response);\n    } else {\n      options.error();\n    }\n  };\n  \n  xhr.send(null);\n};\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  fns.forEach(el => el());\n});\n\n// $.ajax({\n//     type: 'GET',\n//     url: \"http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=bcb83c4b54aee8418983c2aff3073b3b\",\n//     success(data) {\n//       console.log(\"We have your weather!\")\n//       console.log(data);\n//     },\n//     error() {\n//       console.error(\"An error occurred.\");\n//     },\n//  });\n\n//# sourceURL=webpack:///./lib/main.js?");

/***/ })

/******/ });