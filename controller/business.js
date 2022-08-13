const { Business } = require('../model/index');
const fs = require('fs');

const addBusiness = async (ctx) => {
  let  {name,des , icon, content} = ctx.request.body;
  const findResult = await Business.find({name});
  if(findResult.length>0){
    if(icon){
      icon = icon.replace( ctx.origin,'');
      await fs.unlinkSync('./public/' + icon);
    }
    ctx.status = 200;
    ctx.body = {
        code: 40001,
        mes: '业务名称已存在!'
    }
  }else{
      // 正常提交
      const  Newbusiness = new Business({
        name,des,icon,content  
      });
      await  Newbusiness.save().then(res=>{
        ctx.status = 200
        ctx.body = {
            code: 200,
            mes: '业务添加成功',
            data: res
        }
      })

  }

}
const getBusiness = async (ctx) => {
    let findResult = await Business.find();
    ctx.status = 200;
    ctx.body = {
        code: 200,
        mes: "获取业务列表成功",
        data: findResult
    }
}
const deleteBusiness = async (ctx) => {
    const { _id } = ctx.request.body;
    // 删除案例的同时，需要删除存储的图片
    const findResult = await Business.find({ _id });
    const icon = findResult[0].icon? findResult[0].icon.replace(ctx.origin, '') : '';
    try {
        if (icon) {
           await fs.unlinkSync('./public/' + icon);
        }
    } catch (err) {
      
    }
    await Business.deleteOne({ _id }).then((res) => {
        ctx.status = 200;
        ctx.body = {
            code: 200,
            mes: "删除业务成功"
        }
    });
}

module.exports = {
    addBusiness,
    getBusiness,
    deleteBusiness 
}