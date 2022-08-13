const { Team } = require("../model/index");
const fs = require("fs");

const addTeam = async (ctx) => {
  let { name, position, experience, thumbnail } = ctx.request.body;
  const findResult = await Team.find({ name });
  if (findResult.length > 0) {
    if (thumbnail) {
      thumbnail = thumbnail.replace(ctx.origin, "");
      await fs.unlinkSync("./public/" + thumbnail);
    }
    ctx.status = 200;
    ctx.body = {
      code: 40001,
      mes: "成员名字已存在!",
    };
  } else {
    // 正常提交
    const Teamer = new Team({
      name,
      position,
      experience,
      thumbnail,
    });
    await Teamer.save().then((res) => {
      ctx.status = 200;
      ctx.body = {
        code: 200,
        mes: "添加成员成功",
        data: res,
      };
    });
  }
};
const getTeams = async (ctx) => {
  const _id = ctx.request.query._id || null;
  let findResult;
  if (_id) {
    findResult = await Team.find({ _id });
    ctx.status = 200;
    ctx.body = {
      code: 200,
      mes: "获取成员成功",
      data: findResult,
    };
  } 
  else {
    findResult = await Team.find();

    const page = ctx.request.query.page || 1;
    const num = ctx.request.query.num || 6;
    let pages = Math.ceil(findResult.length / num);

    if (pages !== 1) {
      findResult = findResult.slice((page - 1) * num, page * num);
    }
    ctx.status = 200;
    ctx.body = {
      code: 200,
      mes: "获取成员列表成功",
      data: findResult,
      pages,
      page
    };
  }
};

const deleteTeam = async (ctx) => {
  const { _id } = ctx.request.body;
  // 删除案例的同时，需要删除存储的图片
  const findResult = await Team.find({ _id });
  const thumbnail = findResult[0].thumbnail
    ? findResult[0].thumbnail.replace(ctx.origin, "")
    : "";
  try {
    if (thumbnail) {
      await fs.unlinkSync("./public/" + thumbnail);
    }
  } catch (err) {}
  await Team.deleteOne({ _id }).then((res) => {
    ctx.status = 200;
    ctx.body = {
      code: 200,
      mes: "删除成员成功",
    };
  });
};

module.exports = {
  addTeam,
  getTeams,
  deleteTeam,
};
