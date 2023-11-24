// new constructor(args)

function myNew(constructor, ...args) {
  // 1.创建一个新对象
  // 2.将新对象的原型指向构造函数的原型对象；
  // 3.将构造函数的作用域赋给新对象 && 执行构造函数 (指定this = 临时对象)
  // 4.如果构造函数有返回一个非空的对象， 则返回该对象 否则返回新对象
  const newObj = {};
  Object.setPrototypeOf(newObj, constructor.prototype); // 相当于  newObj.__proto__ = constructor.prototype  不符合现代浏览器推荐
  const result = constructor.apply(newObj, args); //指定newobj为 作用域 （指定this）
  return typeof result === "object" && result !== null ? result : newObj;
}
