const { Banner } = require('../model/index');
const fs = require('fs');
const addBanner = async (ctx) => {
    const {bannerurl, title,link,des,bgcolor } = ctx.request.body;
    const findResult = await Banner.find({bannerurl,title});
    if(findResult.length>0){
        const bannerurl = bannerurl.replace(ctx.origin,'');
        await fs.unlinkSync('./public/' + bannerurl);
        ctx.status = 200;
        ctx.body= {
            code:40001,
            mes:"轮播已经存在"
        }
    }else{
        const newBanner = new Banner({ bannerurl, title, link,des,bgcolor});
       await newBanner.save().then(res=>{
            ctx.status = 200
            ctx.body = {
                code: 200,
                mes: '轮播添加成功',
                data: res
            }
        });
    }
}
const getBannerList = async (ctx) => {
   const findResult=  await  Banner.find();
   if(findResult.length>0){
       ctx.status =200;
       ctx.body = {
           code :200,
           mes: '获取轮播列表成功',
           data:findResult
       }
   }else{
       ctx.status = 200;
       ctx.body = {
           code :40001,
           mes: "轮播列表为空,请添加轮播"
       }
   }
}
const deleteBanner = async (ctx) => {
    const {_id } = ctx.request.body;
    const findResult = await Banner.find({ _id });
    const bannerurl = findResult[0].bannerurl? findResult[0].bannerurl.replace(ctx.origin, '') : '';
    try {
        if (bannerurl) {
           await fs.unlinkSync('./public/' + bannerurl);
        }
    } catch (err) {
      
    }
    await Banner.deleteOne({ _id }).then((res) => {
        ctx.status = 200;
        ctx.body = {
            code: 200,
            mes: "删除轮播成功"
        }
    });
}


module.exports = {
   addBanner,
   getBannerList,
   deleteBanner
}