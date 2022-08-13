const { Company } = require('../model/index');
const fs = require('fs');

// 添加公司信息
const addCompanyInfo = async (ctx) => {
    const { name, logo, wechat, address, copyright, contacts, qq, map } = ctx.request.body;
    const findResult = await Company.find();

    if (findResult.length > 0) {
         // 删除原有图片
         const oldlogo = findResult[0].logo ;
         const oldwechat = findResult[0].wechat;
         
         try {
             if (oldlogo != logo) {
                 oldlogo = oldlogo.replace(ctx.origin,'');
                 await fs.unlinkSync('./public/' + oldlogo);
             }
             if(oldwechat !=wechat){
                oldwechat = oldwechat.replace(ctx.origin,'');
                await fs.unlinkSync('./public/' + oldwechat);
             }
         } catch (err) {
 
         }
        await Company.updateOne({ name, logo, wechat, address, copyright, contacts, qq, map }).then(res => {

            if (res.n > 0) {
                ctx.status = 200;
                ctx.body = {
                    code: 200,
                    mes: '更新公司信息成功'
                }
            }
        });
       
    } else {
        const NewCompanyInfo = new Company({
            name, logo, wechat, address, copyright, contacts, qq, map
        });
        await NewCompanyInfo.save().then(res => {
            ctx.status = 200;
            ctx.body = {
                code: 200,
                mes: '添加公司信息成功',
                data: res
            }
        });
    }

}

// 获取公司信息
const getCompanyInfo = async (ctx) => {
    const findResult = await Company.find();
    if (findResult.length > 0) {
        ctx.code = 200;
        ctx.body = {
            code: 200,
            mes: '获取公司信息成功',
            data: findResult
        }
    }
    // else{
    //     ctx.code =200
    //     ctx.body = {
    //         code:40001,
    //         mes:"公司信息不存在"
    //     }
    // }
}


module.exports = {
    addCompanyInfo,
    getCompanyInfo
}