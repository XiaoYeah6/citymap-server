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

router.get("/getArticleById", async (ctx) => {
  const Article = mongoose.model("Article");
  await Article.find({ regionId: ctx.query.regionId })
    .sort({ '_id': -1 })
    .exec()
    .then((res) => {
      ctx.body = res;
    })
    .catch((err) => {});
});

router.post("/getArticleByMarker", async (ctx) => {
  const Article = mongoose.model("Article");
  await Article.find({ marker: ctx.request.body.markerPoint })
    .sort({ '_id': -1 })
    .exec()
    .then((res) => {
      ctx.body = res;
    })
    .catch((err) => {});
});

module.exports = router;
