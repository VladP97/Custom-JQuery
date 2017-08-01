window.customJQuery = window.$ = customJSelctor;

function jQuery(selector) {
    this.nodeData = document.querySelectorAll(selector);
    this.selector = selector;
}

jQuery.prototype.addClass = function(className) {
    if (typeof className == 'function') {
        var newClass = className;
        for (let i = 0; i < this.nodeData.length; i++) {
            this.nodeData[i].classList.add(newClass);
        }
    }
    if (typeof className == 'string') {
      var classArr = className.split(' ');
      for (let i = 0; i < this.nodeData.length; i++) {
          for (let j = 0; j < classArr.length; j++) {
              this.nodeData[i].classList.add(classArr[j]);
          }
      }
    }
    return this;
}

jQuery.prototype.append = function(element) {
    if (typeof element == "object" || typeof element == "function") {
        var newNode = element;
        for (let i = 0; i < this.nodeData.length; i++) {
            this.nodeData[i].appendChild(newNode);
        }
    } else {
        for (let i = 0; i < this.nodeData.length; i++) {
            this.nodeData[i].innerHTML += element;
        }
    }
    return this;
}

jQuery.prototype.html = function(element) {
    if (arguments.length == 0) {
        return this.nodeData[0].html;
    } else if (typeof element == "object" || typeof element == "function") {
        var newNode = element;
        for (let i = 0; i < this.nodeData.length; i++) {
            this.nodeData[i].innerHTML = '';
            return this.nodeData[i].appendChild(newNode);
        }
    } else if (element instanceof String) {
        for (let i = 0; i < this.nodeData.length; i++) {
            this.nodeData[i].innerHTML = '';
            return this.nodeData[i].innerHTML = element;
        }
    }
    return this;
}

jQuery.prototype.attr = function(attrName, value) {
    if (arguments.length == 1 && typeof arguments[0] != 'object') {
        return this.nodeData[0].getAttribute(attrName);
    } else if (arguments.length == 2 && typeof arguments[1] != 'function') {
        for (let i = 0; i < this.nodeData.length; i++) {
            this.nodeData[i].setAttribute(attrName, value);
        }
    } else if (arguments.length == 2 && typeof arguments[1] == 'function') {
        for (let i = 0; i < this.nodeData.length; i++) {
            let newAttrValue = value;
            this.nodeData[i].setAttribute(attrName, newAttrValue);
        }
    } else if (arguments.length == 1 && typeof arguments[0] == 'object') {
        for (let i = 0; i < this.nodeData.length; i++) {
            for (let el in attrName) {
                this.nodeData[i].setAttribute(el, attrName[el]);
            }
        }
    }
    return this;
}

jQuery.prototype.children = function(selector) {
    var newnodeData = this.nodeData[0].childNodes;;
    if (arguments.length == 0) {
        for (let i = 1; i < this.nodeData.length; i++) {
            newnodeData += this.nodeData[i].childNodes;
        }
    } else if (arguments.length == 1) {
        for (let i = 1; i < this.nodeData.length; i++) {
            newnodeData += this.nodeData[i].querySelectorAll(selector).childNodes;
        }
    }
    this.nodeData = newnodeData;
    return this;
}

jQuery.prototype.css = function(styleName, value) {
    if (arguments.length == 1) {
        for (let i = 0; i < this.nodeData.length; i++) {
            return this.nodeData[i].style[styleName];
        }
    }
    if (arguments.length == 2 & typeof value != 'function') {
        for (let i = 0; i < this.nodeData.length; i++) {
            this.nodeData[i].style[styleName] = value;
        }
    }
    if (arguments.length == 2 & typeof value == 'function') {
        let newValue = value;
        for (let i = 0; i < this.nodeData.length; i++) {
            this.nodeData[i].style[styleName] = newValue;
        }
    }
    if (arguments.length == 1 & typeof arguments[0] == 'object') {
        for (let i = 0; i < this.nodeData.length; i++) {
            for (let att in value) {
                this.nodeData[i].style[att] = value[att];
            }
        }
    }
    return this;
}

jQuery.prototype.data = function(key, value) {
    if (arguments.length == 2) {
        for (let i = 0; i < this.nodeData.length; i++) {
            this.nodeData[i].dataset[key] = value
        }
    }
    if (arguments.length == 1 & typeof key == 'object') {
        for (let i = 0; i < this.nodeData.length; i++) {
            for (let el in key) {
                this.nodeData[i].dataset[el] = key[el];
            }
        }
    }
    if (arguments.length == 1 & typeof key != 'object') {
        return this.nodeData[0].dataset[key];
    }
    if (arguments.length == 0) {
        return this.nodeData[0].dataset;
    }
    return this;
}

jQuery.prototype.on = function(events, handler) {
    for (let i = 0; i < this.nodeData.length; i++) {
        this.nodeData[i].addEventListener(events, handler);
    }
    return this;
}

jQuery.prototype.one = function(events, handler) {
    for (let i = 0; i < this.nodeData.length; i++) {
        this.nodeData[i].addEventListener(events, handler);
    }
    return this;
}

jQuery.prototype.each = function(callback) {
    this.nodeData.forEach = callback;
    return this;
}

function customJSelctor(selector) {
    return new jQuery(selector);
}
