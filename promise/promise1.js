class MyPromise {
  constructor(executor) {
    this.status = 'pending' // promise状态
    this.value = undefined // 成功的值
    this.reason = undefined // 失败的原因

    this.onFulfilledCallbacks = [] // 成功的回调
    this.onRejectedCallbacks = [] // 失败的回调

    const resolve = (value) => {
      if (this.status === 'pending') {
        this.status = 'fulfilled'
        this.value = value
        this.onFulfilledCallbacks.forEach((fn) => fn())
      }
    }

    const reject = (reason) => {
      if (this.status === 'pending') {
        this.status = 'rejected'
        this.reason = reason
        this.onRejectedCallbacks.forEach((fn) => fn())
      }
    }

    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onFulfilled, onRejected) {

    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value
    onRejected = typeof onRejected === 'function' ? onRejected : (reason) => { throw reason }


    const promise2 = new MyPromise((resolve, reject) => {
      if (this.status === 'fulfilled') {
        queueMicrotask(() => {
          try {
            const x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      } else if (this.status === 'rejected') {
        queueMicrotask(() => {
          try {
            const x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      } else if (this.status === 'pending') {
        this.onFulfilledCallbacks.push(() => {
          queueMicrotask(() => {
            try {
              const x = onFulfilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          })
        })

        this.onRejectedCallbacks.push(() => {
          queueMicrotask(() => {
            try {
              const x = onRejected(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          })
        })
      }
    })

    return promise2
  }
  resolvePromise(promise2, x, resolve, reject) {
    //1. 判断x和promise2是否是它自己 相等就报错
    if (promise2 === x) {
      return reject(new TypeError('Chaining cycle detected for promise'))
    }
    //2. x 是否是Promise的实例对象
    if (x instanceof MyPromise) {
      x.then((y) => {
        this.resolvePromise(promise2, y, resolve, reject)
      }, reject)
    } else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {

      // 3. 处理thenable对象
      let called = false // 防止多次调用
      try {
        let then = x.then
        if (typeof then === 'function') {
          then.call(x, (y) => {
            if (called) return
            called = true
            this.resolvePromise(promise2, y, resolve, reject) //递归解析
          }, (r) => {
            if (called) return
            called = true
            reject(r)
          })
        } else {
          resolve(x)
        }
      } catch (error) {
        if (called) return
        called = true
        reject(error)
      }
    } else {
      resolve(x)
    }
  }
}