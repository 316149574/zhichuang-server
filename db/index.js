const mongoose = require('mongoose');

module.exports = ()=>{
    mongoose.connect('mongodb://zhichuang.team:27017/zhichuang',{useNewUrlParser:true,useUnifiedTopology: true },).then(()=>{
        console.log("数据库链接成功");
    }).catch(err=>{
        console.error('数据库链接失败'+err);
    });
}