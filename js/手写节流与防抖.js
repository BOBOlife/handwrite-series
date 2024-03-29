// 防抖和节流的相同点
// 都是为了阻止操作的高频触发，从而浪费性能

// 节流（一段时间内只执行一次）
function throttle(fn, delay) {
  let canUse = true;
  return function () {
    if (canUse) {
      fn.apply(this, arguments);
      canUse = false;
      setTimeout(() => (canUse = true), delay);
    }
  };
}

// 防抖（一段时间会等，然后带着一起做了）

function debounce(fn, delay) {
  let timerId = null;
  return function () {
    const context = this;
    if (timerId) {
      window.clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn.apply(context, arguments);
      timerId = null;
    }, delay);
  };
}
