/**
 * 使用类实现继承
 */

class Animal {
  constructor(color) {
    this.color = color;
  }
  move() {}
}

class Dog extends Animal {
  constructor(color, name) {
    super(color);
    this.name = name;
  }
  say() {}
}

/**
 * 使用函数实现继承
 */

function Animal_2(color) {
  this.color = color;
}
Animal_2.prototype.move = function () {};

function Dog_2(color, name) {
  Animal_2.apply(this, arguments);
  this.name = name;
}

function Temp(){}
Temp.prototype = Animal_2.prototype
Dog_2.prototype = new Temp()

Dog_2.prototype.constructor = Dog_2

Dog_2.prototype.say =function(){}
var dog = new Dog_2('黄色','阿黄')
