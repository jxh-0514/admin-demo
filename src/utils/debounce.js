/*
 * @Descripttion:
 * @version:
 * @Author: 杭
 * @Date: 2023-01-14 14:45:30
 * @LastEditors: 杭
 * @LastEditTime: 2023-06-25 13:21:07
 */
/**
 * 防抖
 * @param {*} fn 
 * @param {*} delay 
 * @returns 
 * 使用方法
 * 定义一个方法
 * handleEmit: debounce(function(data) {
      var that = this;
      // 执行的操作
   }, 1000)
   调用
   handleEmit()
 */
function debounce(fn, delay = 300) {
  var timer = null;
  return function () {
    var _this = this;
    var args = arguments;
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(_this, args);
    }, delay);
  };
}
/**
 * 节流
 * @param {*} func
 * @param {*} delay
 * @returns
 */
function throttle(func, delay) {
  let timerId;
  let lastExecTime = 0;

  return function (...args) {
    const currentTime = Date.now();

    if (currentTime - lastExecTime < delay) {
      clearTimeout(timerId);

      timerId = setTimeout(() => {
        lastExecTime = currentTime;
        func.apply(this, args);
      }, delay);
    } else {
      lastExecTime = currentTime;
      func.apply(this, args);
    }
  };
}

export { debounce, throttle };
