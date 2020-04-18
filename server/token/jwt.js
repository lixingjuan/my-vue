/**
 * 基于token的验证原理
 * 1. 登录时，客户端发送用户名和密码；
 * 2. 服务器端校验通过就会发送一个有时效的token串，发送给客户端；
 * 3. 客户端拿到token, 一般都会存储在localStorage或者cookies里；
 * 4. 客户端每次请求都带有token, 可以将其放在请求头里面，每次请求都携带token
 * 5. 服务端验证token, 所有需要校验身份的接口都会被校验token, 若token解析后的数据包含用户身份信息，则返回数据，否则抛出错误
 */
/**
 * node+jwt(jsonwebtoken) 搭建token身份认证步骤
 * 1. npm i jsonwebtoken // 安装jsonwebtoken
 * 2. 利用openssl生成私钥和公钥文件
 *    1. 生成私钥：在指定的文件夹下打开终端运行指令 openssl genrsa -out rsa_private_key.pem 1024，该指令会生成1024位的私钥
 *    2. 生成公钥：在指定的文件夹下打开终端运行指令 openssl rsa -in rsa_private_key.pem -pubout -out rsa_public_key.pem，该指令会生成1024位的公钥
 */
// 引入模块依赖
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
// 创建 token 类
class Jwt {
  constructor(data) {
    this.data = data;
  }

  // 生成token
  generateToken() {
    let data = this.data;
    let created = Math.floor(Date.now() / 1000);
    let cert = fs.readFileSync(path.join(__dirname, "../pem/rsa_private_key.pem")); // 私钥 可以自己生成
    let token = jwt.sign(
      {
        data,
        exp: created + 60 * 30
      },
      cert,
      { algorithm: "RS256" }
    );
    return token;
  }

  // 校验token
  verifyToken() {
    let token = this.data;
    let cert = fs.readFileSync(path.join(__dirname, "../pem/rsa_public_key.pem")); // 公钥 可以自己生成
    let res;
    try {
      let result = jwt.verify(token, cert, { algorithms: ["RS256"] }) || {};
      let { exp = 0 } = result,
        current = Math.floor(Date.now() / 1000);
      if (current <= exp) {
        res = result.data || {};
      }
    } catch (e) {
      res = "err";
    }
    return res;
  }
}

module.exports = Jwt;
