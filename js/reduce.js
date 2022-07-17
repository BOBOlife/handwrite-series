Array.prototype.myReduce = function (fn, init) {
  let i = 0;
  let len = this.length
  let pre = init 
  if(init === undefined) {
    pre = this[0] 
    i = 1;
  }
  for (; i < len; i++) {
    pre = fn.call(this, pre, this[i], i, this)
  }
  return pre
}