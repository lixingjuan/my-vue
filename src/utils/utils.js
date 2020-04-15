/**
 * 这是通用的工具方法,先在vue页面中引入该js，然后才能调用该js中的方法
 */
function isNullData(data) {
  if (
    data === "" ||
    data === null ||
    data === undefined ||
    data === "undefined" ||
    data === "null"
  ) {
    return true;
  } else {
    return false;
  }
}

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

export default {
  /**
   * 判断数据是否为空
   * @param data
   * @returns {boolean}
   */
  isNullData(data) {
    return isNullData(data);
  },

  /**
   * 是否为数字
   * @param data
   * @returns {boolean}
   */
  isNumber(data) {
    if (isNullData(data)) {
      return false;
    }
    if (parseFloat(data).toString() == "NaN") {
      return false;
    } else {
      return true;
    }
  },
  /**
   * 判断字符串str是否以subStr开始
   */
  strStartWith(str, subStr) {
    var reg = new RegExp("^" + subStr);
    return reg.test(str);
  },
  /**
   * 判断字符串str是否以subStr结尾
   */
  strEndWith(str, subStr) {
    var reg = new RegExp(subStr + "$");
    return reg.test(str);
  },

  /**
   * 将json对象转换成数组
   * @param data json对象
   * @returns {Array} json数组
   */
  jsonArray(data) {
    let list = [];
    if (!isNullData(data)) {
      if (Object.prototype.toString.call(data) === "[object Array]") {
        list = data;
      } else {
        list.push(data);
      }
    }
    return list;
  },

  /**
   * 计算某个日期(yyyy-MM-dd)X天后日期
   * @param dateStr
   * @param days
   * @returns {string}
   */
  getDateAfterDays(dateStr, days = 0) {
    let dateArray = dateStr.split("-");
    let date = new Date(dateArray[0], parseInt(dateArray[1]) - 1, dateArray[2]);
    let time = date.getTime() + days * 24 * 3600 * 1000;
    date.setTime(time);
    return (
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    );
  },
  /**
   * 获取两个日期之间间隔的天数(yyyy-MM-dd格式)
   * @param startDateStr
   * @param endDateStr
   * @returns {Number}
   */
  getDaysDiff(startDateStr, endDateStr) {
    let startDates = startDateStr.split("-");
    let startDateObj = new Date(
      startDates[0],
      startDates[1] - 1,
      startDates[2]
    );
    let endDates = endDateStr.split("-");
    let endDateObj = new Date(endDates[0], endDates[1] - 1, endDates[2]);
    return parseInt(
      Math.abs(startDateObj - endDateObj) / 1000 / 60 / 60 / 24 + 1
    );
  },
  /**
   * 将数据存储在localStorage中
   * @param key 会在key前面加上local.防止与其他项目的重复
   * @param value
   */
  setLocalValue(key, value) {
    key = "local." + key;
    let curtime = new Date().getTime(); // 获取当前时间
    localStorage.setItem(key, JSON.stringify({ val: value, time: curtime })); // 转换成json字符串序列
  },
  /**
   * 清除localStorage中的数据
   * @param key
   */
  clearLocalValue(key) {
    key = "local." + key;
    localStorage.removeItem(key);
  },
  /**
   * 从localStorage获取数据
   * @param key 会在key前面加上local.防止与其他项目的重复
   * @param value
   */
  getLocalValue(key) {
    try {
      key = "local." + key;
      let value = localStorage.getItem(key); // 转换成json字符串序列
      if (!isNullData(value)) {
        return JSON.parse(value).val;
      }
      return "";
    } catch (e) {
      console.log("从localStorage获取" + key + "熟悉失败: " + e);
    }
  },
  /**
   * 从url中获取参数
   * @param name
   * @returns {string}
   */
  getQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg); // 这里返回找到正则的匹配
    if (!isNullData(r)) {
      return decodeURIComponent(r[2]); // 这里返回对应的值
    } else {
      return null;
    }
  },
  /**
   * 验证手机号码格式
   * @returns {boolean}
   */
  checkPhone: function(phone) {
    if (!/^1[34578]\d{9}$/.test(phone)) {
      return false;
    } else {
      return true;
    }
  },

  /**
   *  @param name
   *  @returns {string}
   */
  // 处理App请求的url,
  parseQueryString(url) {
    if (!isNullData(url)) {
      let urlDecodeUrl = decodeURI(url);
      let urlSplit = urlDecodeUrl.split("=")[1];
      // 防止页面url增加#字符串
      if (urlSplit.indexOf("#")) {
        urlSplit = urlSplit.split("#")[0];
      }
      return JSON.parse(urlSplit);
    }
  },
  /**
   * 从url根据name获取参数,
   * 上面的getQueryString(name)有一点问题，未考虑到使用hashHistory后会在url后面添加#/
   * @param name
   * @returns {string}
   * @authour TaotaoXu
   */
  getQueryStringByName(name) {
    let url = window.location.href; // 得到整个 url
    let rulSubstr = url.substr(0, 16);
    if (rulSubstr === "http://localhost") {
      return "";
    } else {
      let urlDecodeUrl = decodeURI(url);
      let urlSplit = urlDecodeUrl.split("=")[1];
      // 防止页面url增加#字符串
      if (urlSplit.indexOf("#")) {
        urlSplit = urlSplit.split("#")[0];
      }
      let resultJson = JSON.parse(urlSplit);
      return resultJson[name];
    }
  }
};

export { debounce };
