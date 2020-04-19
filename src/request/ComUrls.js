const baseURL = "http://localhost:4000";

const loginURL = "/login"; // 根据参数判断请求的是未完成/已完成
const uploadFileURL = "/uploadFile"; // 根据参数判断请求的是未完成/已完成
const queryFilesURL = "/queryFiles"; // 查询files表的数据
const addTodoItemURL = "/addTodoItem"; // 根据参数判断请求的是 未完成/已完成
const queryTodoItemsURL = "/queryTodoItems"; // 根据参数判断请求的是 未完成/已完成

export { baseURL, queryTodoItemsURL, addTodoItemURL, loginURL, uploadFileURL, queryFilesURL };
