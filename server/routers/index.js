const login = require("./LoginRoute");
const { queryTodoItems, addTodoItem } = require("./TodoItemsRoute");

module.exports = {
  login,
  addTodoItem,
  queryTodoItems
};
