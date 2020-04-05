/* 所有的接口调用api都从这里导出 */
import { post } from "./axios";
import { queryTodoItemsURL } from "./ComUrls";

const queryTodoItemsAPI = params => post(queryTodoItemsURL, params);

export { queryTodoItemsAPI };
