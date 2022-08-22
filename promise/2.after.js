
// 多个异步请求 如何获取最终结果
import fs from 'fs'

let result = {}

// let index = 0
// const cb = () => {
//   if (++index === 2) {
//     console.log(result);
//   }
// }

function after(times, callback) {
  return function () { // 闭包函数 
    if (--times === 0) callback()
  }
}


const cb = after(2, function () {
  console.log(result);
})


fs.readFile('./name.txt', 'utf8', function (err, data) {
  result.name = data
  cb()
})

fs.readFile('./age.txt', 'utf8', function (err, data) {
  result.age = data
  cb()
})







