const curry = (...args) => {
  let params = args;
  const addFn = (...args2) => {
    params = params.concat(args2);
    return addFn;
  };

  addFn.valueOf = () => {
    return params.reduce((a, b) => a + b, 0);
  };
  return addFn;
};

console.log(curry(1)(2)(3).valueOf()); // 输出 6
console.log(curry(1, 2)(3).valueOf()); // 输出 6
console.log(curry(1)(2, 3).valueOf()); // 输出 6
console.log(curry(1, 2, 3).valueOf()); // 输出 6
