const { About } = require('../model/index');

const addAbout = async (ctx) => {

    const {slogan,introduce,dev,idea,successcase,experience,teamnumber,top  } = ctx.request.body;
    const findResult = await About.find();
    if (findResult.length > 0) {

        // 更新
        await About.updateOne({ slogan,introduce,dev,idea,successcase,experience,teamnumber,top }).then(res=>{
          if(res.n>0){
            ctx.status = 200;
            ctx.body = {
                code: 200,
                mes: '更新成功'
            }
          }
        });
        
    } else {
        // 添加
        const newAbout = new About({
            slogan,
            introduce,
            dev,
            idea,
            successcase,
            experience,
            teamnumber,
            top
        });
        await newAbout.save().then(res => {
            ctx.status = 200;
            ctx.body = {
                code: 200,
                mes: '添加成功',
                data: res
            }
        }).catch(err => {
            console.log(err);
        });
    }
}
const getAbout = async (ctx) => {
    const findResult = await About.find();

    ctx.body = {
        code: 200,
        mes: "获取信息成功",
        data: findResult
    }
}


module.exports = {
   addAbout,
   getAbout
}