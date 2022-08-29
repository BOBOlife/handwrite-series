
// Promise 的概念和特点
// promise 主要是解决异步问题

// 1. 多个异步请求并发 （希望同步最终结果）Promise.all
// 2. 链式异步请求的问题 上一个的输出就是下一个的输入 
// 3. 缺陷： 还是基于回调的

// 1.三种状态 成功态 reslove 失败态 reject 等待态 pending
// 2. 用户自己决定失败的原因和成功的原因 成功和失败也是用户定义的
// 3. promise 默认执行器时立即执行
// 4. promise 都有一个then方法，一个参数是成功的回调 另一个是失败的回调
// 5. 如果执行函数时发生了异常也会执行失败逻辑
// 6. promise 一旦成功就不能失败 反之亦然 (只有等待状态的才去更改状态)

const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'
const PENDING = 'PENDING'

class NewPromise {
  constructor(executor) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    const reslove = (value) => {
      if (this.status === PENDING) {
        this.value = value
        this.status = RESOLVED
      }
    }
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.reason = this.reason
        this.status = REJECTED
      }
    }
    try {
      executor(reslove, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onFufilled, onRejected) {
    if (this.status === RESOLVED) {
      onFufilled(this.value)
    }
    if (this.status === REJECTED) {
      onRejected(this.reason)
    }
  }
}