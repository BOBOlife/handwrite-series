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
