const mongoose = require("mongoose");

module.exports = () => {
  mongoose
    .connect("mongodb://119.3.202.71:27017/zhichuang", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("数据库链接成功");
    })
    .catch((err) => {
      console.error("数据库链接失败" + err);
    });
};
