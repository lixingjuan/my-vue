const Koa = require("koa");
const route = require("koa-route");
const bodyParser = require("koa-bodyparser");

const { query } = require("./db/index");
// const { queryTodoItemsIsDoneSQL, queryTodoItemsIsNotDoneSQL, addTodoItemSQL } = require("./db/sql");
const app = new Koa();

// 注意require('koa-router')返回的是函数:
const router = require("koa-router")();

// 由于middleware的顺序很重要，这个koa-bodyparser必须在router之前被注册到app对象上。
app.use(bodyParser());

// add router middleware:
app.use(router.routes());

const main = function(ctx) {
  // koa设置cookies
  const n = Number(ctx.cookies.get("view") || 0) + 1;
  ctx.cookies.set("view", n);
  ctx.response.body = n + " views";
};

const demo = ctx => {
  ctx.response.body = "hello demo";
};

const redirect = ctx => {
  ctx.response.redirect("/");
  ctx.response.body = "<a href='/'>主页</a>";
};

const items = async ctx => {
  const { isTodo, pageSize = 10, page = 1 } = ctx.request.body;
  //   收到客户端{pageNo:5,pagesize:10}
  // select * from table where good_id > (pageNo-1)*pageSize limit pageSize;
  // select * from table limit (pageNo-1)*pageSize, pageSize;
  // select * from todolist where isdone=0
  // const sql = `select * from todolist limit (${page} - 1) * ${pageSize},${pageSize} `;

  const sql = `select * from todolist  WHERE isTodo=${isTodo === true ? 1 : 0} limit ${(page - 1) *
    pageSize},${pageSize} `;

  const res = await query(sql);
  // let res;
  // if (isComplete === true) {
  //   res = await query(queryTodoItemsIsDoneSQL);
  // } else if (isComplete === false) {
  //   res = await query(queryTodoItemsIsNotDoneSQL);
  // } else {
  //   res = await query("SELECT * from todolist");
  // }

  ctx.response.body = res;
};

const addTodoItem = async ctx => {
  console.log(ctx.request.body);
  // 遍历body 生成 键数组和值数组
  const reqObj = ctx.request.body;
  const { uuid, todoText, isDone } = reqObj;
  // {
  //   todoText: '',
  //   uuid: '',
  //   isDone:0
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

console.log("over");
// app.use(async ctx => {
//   ctx.body = "Hello World";
// });
// app.use(route.routes());
app.use(route.get("/", main));
app.use(route.get("/demo", demo));
app.use(route.get("/err", redirect));
app.use(route.post("/queryTodoItems", items));
app.use(route.post("/addTodoItem", addTodoItem));
// app.use(main);

app.listen(4000);

global.console.log("🚕 server listening at port 4000");
