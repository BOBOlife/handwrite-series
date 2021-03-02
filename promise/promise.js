/*
 *  简易版本Promise，后续写完整版本的
 */

class Promise2 {
  queue1 = []; // queue1 容纳成功之后的函数们
  queue2 = []; // queue2 容纳失败之后的函数们
  constructor(fn) {
    const resolve = data => {
      setTimeout(() => {
        for (let i = 0; i < this.queue1.length; i++) {
          this.queue1[i](data);
        }
      });
    };
    const reject = reason => {
      setTimeout(() => {
        for (let i = 0; i < this.queue2.length; i++) {
          this.queue2[i](reason);
        }
      });
    };
    fn(resolve, reject);
  }
  then(s, e) {
    this.queue1.push(s);
    this.queue2.push(e);
    return this;
  }
}

const q1 = new Promise2((resolve, reject) => {
  console.log('——————');
  if (Math.random() > 0.5) {
    resolve('\n成功1');
  } else {
    reject('\n失败1');
  }
});

q1.then(
  data => {
    console.log('success' + data);
  },
  err => {
    console.log('error' + err);
  }
).then(
  data => {
    console.log('成功2');
  },
  error => {
    console.log('失败2');
  }
);
