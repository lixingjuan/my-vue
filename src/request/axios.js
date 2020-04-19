import axios from "axios";
import { Toast } from "vant";

import { baseURL, loginURL } from "./ComUrls";
import { docCookies } from "@/utils";

// axios.defaults.baseURL = baseURL;

// 请求超时时间
axios.defaults.timeout = 3000;
// 请求拦截器
axios.interceptors.request.use(
  config => {
    if (config.url !== loginURL) {
      const token = docCookies.getItem("token");
      config.headers.common.Authorization = token;
    } else {
      config.headers.common.Authorization = "login";
    }
    return config;
  },
  error => {
    console.log("request Error", error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response && response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        case 401:
          Toast("未登录状态");
          window.location.href = "/";
          break;
        case 403:
          Toast({
            message: "登录过期，请重新登录",
            duration: 1000,
            forbidClick: true
          });
          break;
        case 404:
          Toast({
            message: "网络请求不存在",
            duration: 1500,
            forbidClick: true
          });
          break;
        case 500:
          Toast({
            message: "请求失败",
            duration: 1500,
            forbidClick: true
          });
          break;
        default:
          Toast({
            message: error.response.data.message,
            duration: 1500,
            forbidClick: true
          });
      }
      return Promise.reject(error.response);
    } else {
      window.console.log("res异常打印", error);
      Toast("请求异常");
    }
  }
);

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function post(url, params) {
  return axios
    .post(url, params)
    .then(res => {
      window.console.log("http打印", res);
      return res.data;
    })
    .catch(err => {
      return err.data;
    });
}

export { post, get, baseURL };
