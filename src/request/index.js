/* 所有的接口调用api都从这里导出 */
import { post } from "./axios";
import {
  loginURL,
  queryFilesURL,
  uploadFileURL,
  addTodoItemURL,
  queryTodoItemsURL
} from "./ComUrls";

const loginApi = params => post(loginURL, params); // 登陆API
const queryFilesApi = params => post(queryFilesURL, params); // 查询文件
const uploadFileApi = params => post(uploadFileURL, params); // 上传文件
const addTodoItemApi = params => post(addTodoItemURL, params); // 添加todo
const queryTodoItemsAPI = params => post(queryTodoItemsURL, params); // 查询todo

export { queryTodoItemsAPI, addTodoItemApi, loginApi, uploadFileApi, queryFilesApi };
