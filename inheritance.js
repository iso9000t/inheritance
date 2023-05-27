// Base class
function BaseBuilder() {
}

BaseBuilder.prototype.plus = function() {
  for (var i = 0; i < arguments.length; i++) {
    this.value += arguments[i];
  }
  return this;
};

BaseBuilder.prototype.minus = function() {};

BaseBuilder.prototype.multiply = function() {};

BaseBuilder.prototype.divide = function() {};

BaseBuilder.prototype.mod = function() {};

BaseBuilder.prototype.remove = function() {};

BaseBuilder.prototype.sub = function() {};

BaseBuilder.prototype.get = function() {
  return this;
};

// ES6 IntBuilder class
class IntBuilder extends BaseBuilder {
  constructor(value = 0) {
    super();
    this.value = value; 
  }

  minus(...args) {
    this.value -= args.reduce((acc, cur) => acc + cur, 0);
    return this;
  }

  multiply(n) {
    this.value *= n;
    return this;
  }

  divide(n) {
    this.value = Math.floor(this.value / n);
    return this;
  }

  mod(n) {
    this.value %= n;
    return this;
  }

  static random(from, to) {
    return Math.floor(Math.random() * (to - from + 1)) + from;
  }

}

// ES5 StringBuilder class
function StringBuilder(value) {
  if (typeof value !== 'undefined') {
    this.value = value;
  } else {this.value = ''}
}

StringBuilder.prototype = Object.create(BaseBuilder.prototype);
StringBuilder.prototype.constructor = StringBuilder;

StringBuilder.prototype.minus = function(n) {
    this.value = this.value.slice(0, -n);
    return this;
};

StringBuilder.prototype.multiply = function(n) {
    var tempValue = this.value;
    for (var i = 1; i < n; i++) {
        this.value += tempValue;
    }
    return this;
};

StringBuilder.prototype.divide = function(n) {
    var k = Math.floor(this.value.length / n);
    this.value = this.value.slice(0, k);
    return this;
};

StringBuilder.prototype.remove = function(str) {
    while (this.value.includes(str)) {
        var index = this.value.indexOf(str);
        var length = str.length;
        this.value = `${this.value.slice(0, index)}${this.value.slice(index + length)}`;
    }
    return this;
};

StringBuilder.prototype.sub = function(from, n) {
    this.value = this.value.substr(from,n);
    return this;
};


/* 
//======================================EXAMPLES FOR TESTING THE CODE:=================================================

//TESTING IntBuilder
console.log(IntBuilder.random(10, 100)); // Random number;

let intBuilder = new IntBuilder(10); // 10;
console.log(
intBuilder
  .plus(2, 3, 2)                     // 17;
  .minus(1, 2)                       // 14;
  .multiply(2)                       // 28;
  .divide(4)                         // 7;
  .mod(3)                            // 1;
  .get()                            // -> 1;
)

//Testing StringBuilder

// EXAMPLE:
let strBuilder = new StringBuilder('Hello'); 
console.log(strBuilder); 
console.log(                    // 'Hello';
strBuilder                                   
  .plus(' all', '!')                         // 'Hello all!'
  .minus(4)                                  // 'Hello '
  .multiply(3)                               // 'Hello Hello Hello '
  .divide(4)                                 // 'Hell';
  .remove('l')                               // 'He';
  .sub(1,1)                                  // 'e';
  .get()                                     
);    

 */                                               