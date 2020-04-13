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

export { debounce };
