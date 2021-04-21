const Router = require("koa-router");
let router = new Router();
const mongoose = require("mongoose");
const Koa = require("koa");

router.post("/writeArticle", async (ctx) => {
  const Article = mongoose.model("Article");
  let newArticle = new Article(ctx.request.body);
  await newArticle
    .save()
    .then(() => {
      ctx.body = {
        code: 200,
        message: "保存成功",
      };
    })
    .catch((err) => {
      ctx.body = {
        code: 500,
        message: err,
      };
    });
});

router.get("/getArticle", async (ctx) => {
  const Article = mongoose.model("Article");
  await Article.find({ cityId: ctx.query.cityId })
    .sort({ '_id': -1 })
    .skip(parseInt(ctx.query.start))
    .limit(parseInt(ctx.query.limit))
    .exec()
    .then((res) => {
      ctx.body = res;
    })
    .catch((err) => {});
});

module.exports = router;
