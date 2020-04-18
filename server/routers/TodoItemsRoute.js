const { query } = require("../db/index");
const JwtUtil = require("../token/jwt");

const queryTodoItems = async ctx => {
  const { isTodo, pageSize = 10, page = 1 } = ctx.request.body;
  //   收到客户端{pageNo:5,pagesize:10}
  // select * from table where good_id > (pageNo-1)*pageSize limit pageSize;
  // select * from table limit (pageNo-1)*pageSize, pageSize;
  // select * from todolist where isdone=0
  // const sql = `select * from todolist limit (${page} - 1) * ${pageSize},${pageSize} `;
  const reqAuthorization = ctx.header.authorization;
  const sql = `select * from todolist  WHERE isTodo=${isTodo === true ? 1 : 0} limit ${(page - 1) *
    pageSize},${pageSize} `;
  let resBody;

  let jwt = new JwtUtil(reqAuthorization);
  let verifyResult = jwt.verifyToken();

  console.log(verifyResult);
  if (verifyResult === "success") {
    resBody = await query(sql);
  } else {
    resBody = "401";
  }
  ctx.response.body = resBody;
};

const addTodoItem = async ctx => {
  console.log(ctx.request.body);
  // 遍历body 生成 键数组和值数组
  const reqObj = ctx.request.body;
  const { uuid, todoText, isDone } = reqObj;
  // {
  //   todoText: '',
  //   uuid: '',
  //   isTodo:0
  // }
  console.log(isDone);
  let res = await query(
    `INSERT INTO todolist
     (uuid,todoText,isDone) 
     VALUES
     ('${uuid}','${todoText}','${isDone}')`
  );

  console.log(res);
  ctx.response.body = res;
};
module.exports = {
  addTodoItem,
  queryTodoItems
};
