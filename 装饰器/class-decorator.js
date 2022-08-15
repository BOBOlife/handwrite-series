// 装饰器可以修饰类 类的属性 类的原型上的方法

// 修饰的时候 就是把这个类 属性... 传递给修饰的函数

// @flag
@flag('灵长目')  //返回的还是一个函数 
class Animal {
  @readonly
  PI = 3.14
  name = 'xxx' // 实例上的属性 并不是原型上的属性
  @before
  say(a, b, c) {
    console.log('说话', a, b, c);
  }
}
// 相当于
flag('xxx')(Animal) // 这个就是难看了点


// 1) 类的静态属性
// function flag(constructor) {
//   constructor.type = "哺乳类"
// }
// console.log(Animal.type);

function flag(value) {
  return function (constructor) {
    constructor.type = value
  }
}



// 2) 类的属性实例上的属性

function readonly(target, property, decscritor) {
  decscritor.writable = false //PI 不可更改

  // setTimeout(() => {
  // console.log(target === Animal.prototype);
  // })
}

let animal = new Animal()

function before(target, property, decsriptor) {
  let oldSay = decsriptor.value
  decsriptor.value = function () {
    console.log('before doing sth');
    oldSay.call(target, ...arguments)
  }
}
animal.say()







// 这是一个实验性方法 我们需要用babel 转化