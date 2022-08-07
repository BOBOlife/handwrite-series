// 单例模式的基本结构  Vue 注册 里面就用到

let Singleton = function (name) {
  this.name = name
}

Singleton.getInstance = function (name) {
  if (this.instance) {
    return this.instance
  }
  return this.instance = new Singleton(name)
}

function store() {
  this.store = {}
  if (store.install) {
    return store.install
  }
  store.install = this
}
store.install = null
export default store

// 通过定义一个方法 ，使用时只允许通过此方法拿到存在内部的同一化实例化对象

/***********************************************************************/

// 工厂模式
// 一个创建对象的模式

// 目的： 方便我们大量创建对象
// 应用场景： 当某一个对象需要经常创建的时候

// 建造者模式
// 目的：需要组合出一个全局对象
// 应用场景： 当要创建单个、庞大的组合对象时


// 工厂模式的基本结构
function Factory(type) {
  switch (type) {
    case 'type1':
      return new Type1()
      break;
    case 'type2':
      return new Type2()
  }
}

// 工厂模式就是写一个方法，只需调这个方法，就能拿到你要的对象



// 建造这模式的基本结构

// 模块1
function Model1() {

}
// 模块2 
function Model2() {

}

// 最终的使用类
function Final() {
  this.model1 = new Model1()
  this.model2 = new Model2()
}

// 把一个复杂的类各个部分，拆分成独立的类，然后再在最终类里组合到一块，final为最后给出去的类







