
export const debounce = (fn, delay) => {
  let timeout
  return function () {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay)
  }
}

export const throttle = (fn, delay) => {
  let timeout
  return function () {
    if (!timeout) {
      timeout = setTimeout(() => {
        fn.apply(this, arguments)
        timeout = null
      }, delay)
    }
  }
}
  