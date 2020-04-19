// 查询所有的todolist项目
const queryTodoItemsSQL = "SELECT * from todolist"; // 查询所有项目
const queryTodoItemsIsDoneSQL = "select * from todolist where isdone=1"; // 查询已完成项目
const queryTodoItemsIsNotDoneSQL = "select * from todolist where isdone=0"; // 查询已完成项目
// const insertTodoItemSQL = `INSERT INTO table_name ( field1, field2,...fieldN )
//                        VALUES
//                        ( value1, value2,...valueN )`; // 查询已完成项目

module.exports = { queryTodoItemsSQL, queryTodoItemsIsDoneSQL, queryTodoItemsIsNotDoneSQL };
