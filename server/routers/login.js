const { query } = require("../db/index");
// 引入jwt token工具
const JwtUtil = require("../token/jwt");

const login = async ctx => {
  // console.log(ctx.request.body);
  let resBody;
  const { username, password } = ctx.request.body;
  /**
   * 1. 检查用户名是否存在，
   * 2. 若不存在，则返回当前用户不存在；
   * 3. 若存在，则对比密码是否正确，
   *    1. 若正确，则返回token;
   *    2. 若不正确，则返回请检查用户名或者密码
   */

  const res = await query(`SELECT password 
        FROM users
        WHERE username='12'`);

  if (!res) {
    resBody = {
      success: "false",
      errorMessage: "查询出错，请查看后端代码和前端报文！！"
    };
  }
  const result = res[0];

  if (!result) {
    // 查询出错，后端问题
    resBody = {
      success: "false",
      errorMessage: "没有该用户！"
    };
  } else if (password === result.password) {
    let jwt = new JwtUtil(res.password);
    let token = jwt.generateToken();
    resBody = {
      success: "true",
      token: token
    };
  } else {
    resBody = {
      success: "false",
      errorMessage: "用户名或者密码错误",
      res: res || 1
    };
  }

  ctx.response.body = resBody;
};

module.exports = login;
