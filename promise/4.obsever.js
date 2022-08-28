
// 观察者模式
// 有观察者 就有被观察者    
// 观察者需要被放到被观察者中
// 被观察者的状态发生变化需要通知观察者

// 内部也是基于  发布订阅模式  参考 3.on-emit.js  收集观察者  状态变化后要通知观察者

class Subject {  // 被观察者  baby
  constructor(name) {
    this.name = name
    this.state = 'happy'
    this.observers = []
  }

  attach(observerInstance) { // Subject.prototype.attach 
    this.observers.push(observerInstance)
  }

  setState(newState) {
    this.state = newState
    this.observers.forEach(observer => observer.update(this))
  }

}

class Obsever { // 观察者 father mother
  constructor(name) {
    this.name = name
  }

  update(baby) {
    console.log('当前' + this.name + '被通知了，' + '当前宝宝的状态是' + baby.state);
  }

}

let baby = new Subject('宝宝')
let parent = new Obsever('父亲')
let mother = new Obsever('母亲')

baby.attach(parent)
baby.attach(mother)
baby.setState('sad')


