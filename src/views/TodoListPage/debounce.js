var count = 1;
var container = document.getElementById("container");

function getUserAction() {
  container.innerHTML = count++;
}

container.onmousemove = debounce(getUserAction, 1000);
// container.onmousemove = getUserAction;

/* 第一版 */
// function debounce(func, wait) {
//   var timeout;
//   return function() {
//     console.log(this);
//     clearTimeout(timeout);
//     timeout = setTimeout(func, wait);
//   };
// }
/* 第二版：正确的this指向 */
function debounce(func, wait) {
  let timeout;
  return function() {
    let context = this;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      func.apply(context);
    }, wait);
  };
}
