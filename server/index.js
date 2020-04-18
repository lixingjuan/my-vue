const Koa = require("koa");
const route = require("koa-route");
const bodyParser = require("koa-bodyparser");

const JwtUtil = require("./token/jwt");
const { login, queryTodoItems, addTodoItem } = require("./routers");

const app = new Koa();

// 注意require('koa-router')返回的是函数:
const router = require("koa-router")();

// 由于middleware的顺序很重要，这个koa-bodyparser必须在router之前被注册到app对象上。
app.use(bodyParser());

// add router middleware:
app.use(router.routes());

// app.use(function(req, res, next) {
//   // 我这里知识把登陆和注册请求去掉了，其他的多有请求都需要进行token校验
//   if (req.url != "/login" && req.url != "/user/register") {
//     console.log("cece", req);
//     let token = req.headers.authorization;
//     console.log("cece", token);
//     let jwt = new JwtUtil(token);
//     let result = jwt.verifyToken();
//     // 如果考验通过就next，否则就返回登陆信息不正确
//     if (result == "err") {
//       console.log(result);
//       res.send({ status: 403, msg: "登录已过期,请重新登录" });
//       // res.render('login.html');
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });

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

app.use(route.get("/", main));
app.use(route.get("/demo", demo));
app.use(route.get("/err", redirect));
app.use(route.post("/login", login));
app.use(route.post("/queryTodoItems", queryTodoItems)); // 从TodoList表中查询符合条件的项目
app.use(route.post("/addTodoItem", addTodoItem)); // 向TodoList表中 新增符合条件的项目
// app.use(main);

app.listen(4000);

global.console.log("🚕 server listening at port 4000");
