const { Case } = require("../model/index");
const fs = require("fs");

const addCase = async (ctx) => {
  const { name, des, category, isbanner, bannerurl, thumbnail, caseimgurl } =
    ctx.request.body;

  const findResult = await Case.find({
    name,
    des,
    category,
    bannerurl,
    thumbnail,
    caseimgurl,
  });
  if (findResult.length > 0) {
    ctx.status = 200;
    ctx.body = {
      code: 40001,
      mes: "不能重复提交相同项目案例",
    };
  } else {
    // 正常处理 存储提交内容
    const newCase = new Case({
      name,
      des,
      category,
      isbanner,
      bannerurl,
      thumbnail,
      caseimgurl,
      createtime: new Date().getTime(),
    });
    await newCase.save().then((res) => {
      ctx.status = 200;
      ctx.body = {
        code: 200,
        mes: "案例添加成功",
        data: res,
      };
    });
  }
};

const caseList = async (ctx) => {
  // 按分类查询   category
  const category = ctx.request.query.category || "all";
  const page = ctx.request.query.page || 1;
  const num = ctx.request.query.num || 10;
  const _id = ctx.request.query._id || null;

  let findResult;

  if (_id) {
    findResult = await Case.find({ _id });
    ctx.status = 200;
    ctx.body = {
      code: 200,
      mes: "获取案例成功",
      data: findResult,
    };
  } else {
    if (category === "all") {
      findResult = await Case.find();
    } else {
      findResult = await Case.find({ category });
    }

    // 分页设置
    let pages = Math.ceil(findResult.length / num);

    if (pages !== 1) {
      findResult = findResult.slice((page - 1) * num, page * num);
    }
    ctx.status = 200;
    ctx.body = {
      code: 200,
      mes: "获取案例列表成功",
      data: findResult,
      page,
      pages,
    };
  }
};
const deleteCase = async (ctx) => {
  const { _id } = ctx.request.body;
  // 删除案例的同时，需要删除存储的图片
  const findResult = await Case.find({ _id });
  const bannerurl = findResult[0].bannerurl
    ? findResult[0].bannerurl.replace(ctx.origin, "")
    : "";
  const thumbnail = findResult[0].thumbnail
    ? findResult[0].thumbnail.replace(ctx.origin, "")
    : "";
  let caseimgurl = [];

  for (let i = 0; i < findResult[0].caseimgurl.length; i++) {
    caseimgurl.push(findResult[0].caseimgurl[i].replace(ctx.origin, ""));
  }
  try {
    if (bannerurl) {
      await fs.unlinkSync("./public/" + bannerurl);
    }
    if (thumbnail) {
      await fs.unlinkSync("./public/" + thumbnail);
    }
    if (caseimgurl.length > 0) {
      for (let i = 0; i < caseimgurl.length; i++) {
        await fs.unlinkSync("./public/" + caseimgurl[i]);
      }
    }
  } catch (err) {
    // console.log(err);
  }
  await Case.deleteOne({ _id }).then((res) => {
    ctx.status = 200;
    ctx.body = {
      code: 200,
      mes: "删除案例成功",
    };
  });
};

module.exports = {
  addCase,
  caseList,
  deleteCase,
};
