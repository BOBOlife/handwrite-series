import fetch from 'node-fetch';
import fs, { readFileSync } from "fs";

// generate 需要调用执行器 （调用next方法） 才能输出最后的结果 ！！！！！

function* gen() {
  let url = 'https://api.github.com/users/github'
  let result = yield fetch(url)
  console.log("result: " + JSON.stringify(result));
  console.log(result.bio);

}

let g = gen();
let result = g.next();

result.value.then(function (data) {
  return data.json()
}).then(function (data) {
  g.next(data);
})

//*************************************************************************************************/

// promise 写法
const readFile = function (fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf8', (err, data) => {
      if (err) return reject(err);
      resolve(data);
    })
  })
}
// generate 需要调用执行器 （调用next方法） 才能输出最后的结果 ！！！！！

// generate 写法
const gen = function* () {
  const f1 = yield readFile('./src/home')
  const f2 = yield readFile('./src/route')
  // 同步完成后 才执行后面的代码
  // ................
}

// async / await
const asyncReadFile = async function () {
  const f1 = await readFile('./src/home')
  const f2 = await readFile('./src/route')
  // 同步完成后 才执行后面的代码
  // ................
}