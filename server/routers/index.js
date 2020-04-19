const login = require("./LoginRoute");
const { uploadFile, queryFiles } = require("./FilesRoute");
const { queryTodoItems, addTodoItem } = require("./TodoItemsRoute");

module.exports = {
  login,
  queryFiles,
  uploadFile,
  addTodoItem,
  queryTodoItems
};
