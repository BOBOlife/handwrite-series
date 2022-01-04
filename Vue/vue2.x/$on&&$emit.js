// 采用发布订阅模式实现 (简易版)
class EventBus {
  constructor () {
    this.sub = {} //1. 处理事件的对象，存储地方
  }
  $on(event,fn) {
    if(!this.sub[event]){
      // 2. 判断是否已经有了这个事件，没有就赋值一个数组，用来存储回调函数（触发）
      this.sub[event] = []
    }
    // 3. 将函数push到对应的事件队列中
    this.sub[event].push(fn)
  }
  $emit (event){
    if(this.sub[event]) {
        this.sub[event].forEach(fn => {
          fn()
        });
    }
  }
}

// 通信主线（媒介）
const vm = new EventBus()
// 订阅事件
vm.$on('change',()=> {console.log('触发了change事件')})
vm.$on('click', ()=>{console.log('触发click事件')})
// 发布订阅
vm.$emit('click')
vm.$emit('change')