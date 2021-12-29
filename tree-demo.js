const arr = ['key1', 'key2', 'key3', 'key4']

let a = {}
let b = a
arr.map((item, index) => {
  a[item] = {}
  a = a[item]
})
console.log(b);