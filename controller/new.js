const { News } = require('../model/index');
const tool = require('../config/tool');
const fs = require('fs');

const addNews = async (ctx) => {
    let { title, des, category, thumbnail, content } = ctx.request.body;

    const findResult = await News.find({ title, des, category });
    if (findResult.length > 0) {
        if (thumbnail) {
            thumbnail = thumbnail.replace(ctx.origin, '');
            await fs.unlinkSync('./public/' + thumbnail);
        }
        ctx.status = 200;
        ctx.body = {
            code: 40001,
            mes: '不能重复提交相同新闻内容'
        }
    } else {
        // 正常提交
        const New = new News({
            title, des, category, thumbnail, content, createtime: tool.getTime()
        });

        await New.save().then(res => {
            ctx.status = 200
            ctx.body = {
                code: 200,
                mes: '新闻添加成功',
                data: res
            }
        })

    }

}
const getNews = async (ctx) => {
    // 获取新闻列表
    // 按分类查询   category
    const category = ctx.request.query.category || "all";
    const page = ctx.request.query.page || 1;
    const num = ctx.request.query.num || 10;
    const _id = ctx.request.query._id || null;
    let findResult;
    if(_id){
        findResult = await News.find({ _id });
        ctx.status = 200;
        ctx.body = {
            code: 200,
            mes: "获取新闻成功",
            data: findResult
        }
    }else{
        if (category === "all") {
            findResult = await News.find();
        } else {
            findResult = await News.find({ category });
        }
    
        let pages = Math.ceil(findResult.length / num);
    
        if(pages!==1){
            findResult = findResult.slice( (page-1)*num, page *num);
        }
    
        ctx.status = 200;
        ctx.body = {
            code: 200,
            mes: "获取新闻列表成功",
            data: findResult,
            pages,
            page
        }
    }
    
}
const deleteNew = async (ctx) => {
    const { _id } = ctx.request.query;
    // 删除案例的同时，需要删除存储的图片
    const findResult = await News.find({ _id });
    const thumbnail = findResult[0].thumbnail ? findResult[0].thumbnail.replace(ctx.origin, '') : '';
    try {
        if (thumbnail) {
            await fs.unlinkSync('./public/' + thumbnail);
        }
    } catch (err) {

    }
    await News.deleteOne({ _id }).then((res) => {
        console.log(1);
        ctx.status = 200;
        ctx.body = {
            code: 200,
            mes: "删除案例成功"
        }
    });
}

module.exports = {
    addNews,
    getNews,
    deleteNew
}