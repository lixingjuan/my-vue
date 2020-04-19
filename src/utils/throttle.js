/**
 * @des 节流函数,时间戳
 * @param {Function}
 * @return:
 */
// 有头无尾
function throttle(func, wait = 1000) {
  let context,
    args,
    previous = 0;
  return function() {
    const now = +new Date();
    context = this;
    args = arguments;
    if (now - previous > wait) {
      func.apply(context, args);
      previous = now;
    }
  };
}
/**
 * @des 节流函数,定时器
 * @param {Function}
 * @return:
 */
// 无头有尾
// function throttle(func, wait = 1000) {
//   let timeout, context, args;

//   return function() {
//     context = this;
//     args = arguments;
//     if (!timeout) {
//       timeout = setTimeout(function() {
//         timeout = null;
//         func.apply(context, args);
//       }, wait);
//     }
//   };
// }
/**
 * @des 节流
 * @param {Function} func 要节流触发的函数
 * @param {String} wait 函数每次触发间隔的时间
 * @return:
 */
// 有头有尾
// function throttle(func, wait) {
//   let timeout, context, args;
//   let previous = 0;

//   const later = function() {
//     previous = +new Date();
//     timeout = null;
//     func.apply(context, args);
//   };

//   const throttled = function() {
//     const now = +new Date();
//     // 下次触发 func 剩余的时间
//     var remaining = wait - (now - previous);
//     context = this;
//     args = arguments;
//     // 如果没有剩余的时间了或者你改了系统时间
//     if (remaining <= 0 || remaining > wait) {
//       if (timeout) {
//         clearTimeout(timeout);
//         timeout = null;
//       }
//       previous = now;
//       func.apply(context, args);
//     } else if (!timeout) {
//       timeout = setTimeout(later, remaining);
//     }
//   };
//   return throttled;
// }

export default throttle;
