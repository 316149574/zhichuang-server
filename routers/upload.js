const router = require("koa-router")();
router.prefix("/api");
const upload = require("../config/tool").savefile();
const fs = require("fs");
/*
  @router POST    /api/upload
  @des   上传图片接口
*/
router.post("/upload", upload.single("file"), async (ctx) => {
  // console.log(ctx.request.file);
  // console.log(ctx.origin);
  let { path } = ctx.request.file;
  ctx.status = 200;
  ctx.body = {
    code: 200,
    mes: "保存图片成功",
    data: {
      path: "http://119.3.202.71:3000" + path.replace("public", ""),
    },
  };
});

module.exports = router;
