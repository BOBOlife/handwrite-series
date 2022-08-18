
// 多个异步请求 如何获取最终结果
import fs from 'fs'

let result = {}

// let index = 0
// const cb = () => {
//   if (++index === 2) {
//     console.log(result);
//   }
// }

const cb = after(2, function () {
  console.log();
})

fs.readFile('./name.txt', 'utf8', function (err, data) {
  result.name = data
  cb()
})

fs.readFile('./age.txt', 'utf8', function (err, data) {
  result.age = data
  cb()
})







