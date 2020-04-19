const { query } = require("../db/index");
// 引入jwt token工具
// const JwtUtil = require("../token/jwt");

const uploadFile = async ctx => {
  // console.log(ctx.request.body);
  console.log("uploadFile的请求报文", ctx.request.files);
  let res = await query(
    `INSERT INTO files
     (file,fileName) 
     VALUES
     ('${ctx.request.files}','${ctx.request.files.name}' )`
  );
  console.log(res);
  ctx.response.body = 1;
};

const queryFiles = async ctx => {
  // console.log(ctx.request.body);
  // console.log("uploadFile的请求报文", ctx.request.files);
  let res = await query(" select * from files");
  res = res.map(item => ({ ...item, file: item.file }));

  ctx.response.body = res;
};

module.exports = { queryFiles, uploadFile };
