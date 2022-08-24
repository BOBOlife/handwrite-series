
// 发布订阅模式 主要分成两个部分 on emit
// on 就是一些函数维护到一个数组中
// emit 就是让数组中的方法依次执行

import fs from 'fs'

const event = { // 订阅和发布没有明显的关系  靠 arr（中间的媒介）来建立关联
  arr: [],
  on(fn) {
    this.arr.push(fn)
  },
  emit() {
    this.arr.forEach(fn => fn())
  }
}
event.on(function () {
  console.log('读取一个了');
})
event.on(function () {
  if (Object.keys(result).length === 2) {
    console.log('全部读取结束');
  }
})

const result = {}
fs.readFile('./name.txt', 'utf8', function (err, data) {
  result.name = data
  event.emit()
})

fs.readFile('./age.txt', 'utf8', function (err, data) {
  result.age = data
  event.emit()
})