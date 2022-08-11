function deepClone(obj) {
  //let objClone = Array.isArray(obj)? []:{}
  if (obj instanceof Array) {
    let objClone = [];
  } else {
    let objClone = {};
  }
  if (obj && typeof obj === 'object') {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] && typeof obj[key] === 'object') {
          objClone[key] = deepClone(obj[key]);
        } else {
          return (objClone[key] = obj[key]);
        }
      }
    }
  }
  return objClone;
}

function newDeepClone(obj) {
  if ([null, undefined].includes(obj)) return obj
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj)
  if (typeof obj !== 'object') return obj
  let cloneObj = obj.constructor
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = newDeepClone(obj[key])
    }
  }
  return cloneObj
}



