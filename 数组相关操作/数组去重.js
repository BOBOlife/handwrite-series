// set去重
[...new Set(arr)]

//sort去重
function unique(arr) {
  if (!Array.isArray(arr)) {
    console.log('type error!')
    return
  }
  arr = arr.sort()
  let array = [arr[0]]
  for (let i = i; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1]) {
      array.push(arr[i])
    }
  }
  return array
}

// 对象的属性不能相同
function unique(arr) {
  if (!Array.isArray(arr)) {
    console.log('type error!')
    return
  }
  const array = []
  const obj = {}
  for (let i = 0; i < arr.length; i++) {
    if (!obj[arr[i]]) {
      array.push(arr[i])
      obj[arr[i]] = i
    } else {
      obj[arr[i]]++
    }
  }
  return array
}

// 利用Map数据结构去重
function arrayNonRepeatfy(arr) {
  let map = new Map()
  let array = new Array()
  for (let i = 0; i < arr.length; i++) {
    if (map.has(arr[i])) { // 如果有该key的值
      map.set(arr[i], true)
    } else {
      map.set(arr[i], false)
      array.push(arr[i])
    }
  }
  return array
}