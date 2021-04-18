const Router = require("koa-router");
let router = new Router();
const mongoose = require("mongoose");

router.post("/registUser", async (ctx) => {
  //获取model
  const User = mongoose.model("User");
  let newUser = new User(ctx.request.body);
  await newUser
    .save()
    .then(() => {
      ctx.body = {
        code: 200,
        message: "注册成功",
      };
    })
    .catch((err) => {
      ctx.body = {
        code: 500,
        message: err,
      };
    });
});

router.post("/loginUser", async (ctx) => {
  //接收前端发送的数据
  let loginUser = ctx.request.body;
  let userName = loginUser.userName;
  let passWord = loginUser.passWord;
  //引入model
  const User = mongoose.model("User");
  //匹配数据库里的用户名密码
  await User.findOne({ userName: userName })
    .exec()
    .then(async (result) => {
      if (result) {
        let newUser = new User();
        await newUser
          .comparePassword(passWord, result.passWord)
          .then((isMatch) => {
            if (isMatch) {
              ctx.body = {
                code: 200,
                message: "登陆成功",
                userInfo: result
              };
            } else {
              ctx.body = {
                code: 202,
                message: "密码错误",
              };
            }
          });
      } else {
        ctx.body = {
          code: 201,
          message: "用户名不存在",
        };
      }
    });
});

module.exports = router;
