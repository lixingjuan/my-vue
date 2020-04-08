/* 所有的接口调用api都从这里导出 */
import { post } from "./axios";
import { queryTodoItemsURL, addTodoItemsURL } from "./ComUrls";

const queryTodoItemsAPI = params => post(queryTodoItemsURL, params);
const addTodoItemApi = params => post(addTodoItemsURL, params);

export { queryTodoItemsAPI, addTodoItemApi };
