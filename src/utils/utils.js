/**
 * @des 防抖
 * @param {Function} func 要进行防抖的数据
 * @return:
 */
function debounce(func, wait = 1000) {
  // 可以放入项目中的公共方法中进行调用（鹅只是省事）
  let timeout;
  return function(event) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.call(this, event);
    }, wait);
  };
}

/**
 * @des 颜色转换，十六进制 => RGB
 * @param {String} 16进制颜色
 * @return:
 */
const colorHexToRgb = function() {};

/**
 * @des 颜色转换，RGB => 十六进制
 * @param {String} rgb颜色嗯
 * @return:
 */
const colorRgbToHex = function() {};

export { debounce, colorHexToRgb, colorRgbToHex };
