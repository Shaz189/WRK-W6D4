class DOMNodeCollection {
  constructor(arrHTML) {
    this.arrHTML = arrHTML;
    this.cbData = {};
  }
  
  html (string) {
    if (!string) {
      return this.arrHTML[0];
    } else {
      this.arrHTML.forEach((el) =>{
        el.innerHTML = string;
      });
    }
  }
  
  empty() {
    this.arrHTML.forEach((el) =>{
      el.innerHTML = '';
    });
  }
  
  append(arg) {
    if (arg instanceof HTMLElement) {
      this.arrHTML.forEach((el) => {
        el.innerHTML += arg.outerHTML;
      });
      
    } else if (arg instanceof DOMNodeCollection){
      arg.arrHTML.forEach ( (el) => {

        this.append(arg);
      });
      
    } else if (typeof arg === 'string') {
      this.arrHTML.forEach((el) => {
        el.innerHTML += arg;
      });
      
    } else {
      console.log('ERROR');
    }
  }
  
  attr(key, val) {
    if (val) {
      this.arrHTML[0].setAttribute(`${key}`, val);
    } else {
      return this.arrHTML[0].attributes[`${key}`];
    }
  }
  
  addClass(val) {
    this.arrHTML.forEach ( (el) => {
      let attrVal = el.attributes[`class`].value += ` ${val}`;
    });
  }
  
  removeClass(val) {
    this.arrHTML.forEach ( el => {
      let attrVal = el.attributes[`class`].value;
      const splitVal = attrVal.split(" ");
      const newClasses = splitVal.filter((el) => el !== val);
      el.attributes[`class`].value = newClasses.join(' ');
    });
    this.attr("class", "");
  }
  
  children() {
    const childrenArr = [];
    
    this.arrHTML.forEach((parent) => {
      for (let i = 0; i < parent.children.length; i++) {
        const domNode = new DOMNodeCollection(parent.children[i]);
        childrenArr.push(domNode);
      }
    });
    return childrenArr;
  }
  
  parent() {
    const parentArr = [];
    
    this.arrHTML.forEach((child) => {
      parentArr.push(child.parentElement); 
    });
    
    const uniq = [];
    parentArr.forEach((el) => { 
      if (!uniq.includes(el)) { 
        uniq.push(el); 
      }
    });
    
    return uniq;
  }
  
  find (arg) {
    const result = [];
    this.arrHTML.forEach((el) => {
      result.push(el.querySelectorAll(`${arg}`));
    });
    
    return result;
  }
  
  remove(arr){
    this.arrHTML.forEach((el) => {
      el.remove();
    });
  }
  
  on(method, cb) {
    let that = this;
    this.arrHTML.forEach((el, idx) => {
      el[idx] = cb;
      el.addEventListener(method, cb);
    });
  }
  
  off(method) {
    let that = this;
    this.arrHTML.forEach((el, idx) => {
      el.removeEventListener(method, el[idx]);
    });
  }
  
  
  
}

module.exports = DOMNodeCollection;
