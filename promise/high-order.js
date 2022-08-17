
// 何为高阶函数
// 1. 如果一个函数的参数是一个函数（回调函数就是一钟高阶函数）
// 2. 如果一个函数返回一个函数当前这个函数也是一个高阶函数

// 写一个业务代码，扩展当前的业务代码
function say(a, b) {
  console.log('say', a, b);
}

// 给莫个方法 添加一个方法在他执行之前调用
Function.prototype.before = function (callback) {
  return (...args) => { // 剩余运算符， 箭头函数没有this（向上找）也没有arguments
    callback()
    this(...args) // 展开运算符 apply的用法
  }
}

let beforeSay = say.before(function () {
  console.log('before say');
})
beforeSay('hello', 'world')

/**********************************/

// 函数柯里化 函数反柯里化

// 判断变量的类型
// 常用的判断类型的方法有四种
// typeof 不能判断对象类型 typeof [] typeof {}
// constructor 可以找到这个变量是通过谁构造出来的
// instanceof 判断 谁是谁的实例 __proto__
// Object.prototype.toString.call() 缺陷不能细分谁是谁的实例

// function isType(value, type) {
//   return Object.prototype.toString.call(value) === `[object ${type}]`
// }

// 能不能将方法细分 isType => isString isArray
// console.log(isType([], 'Array'));

function isType(type) {
  return function (value) {
    return Object.prototype.toString.call(value) === `[object ${type}]`
  }
}
const currying = (fn, arr = []) => {
  let len = fn.length // 这里获取的是函数参数的个数
  return function (...args) { // 高阶函数
    arr = [...arr, ...args]
    if (arr.length < len) {
      return currying(fn, arr) // 递归不停的产生函数
    } else {
      return fn(...arr)
    }
  }
}

// 通过一个柯里化函数 实现通用的柯里化方法

// let isArray = isType('Array')
let isArray = currying(isType)("Array")
let isString = currying(isType)("String")
console.log(isArray("hello"));
console.log(isArray("[]"));


// 事例：
// function sum(a, b, c, d, e, f) {
//   return a + b + c + d + e + f
// }
// let res = currying(sum)(1, 2)(3)(4)(5, 6)
