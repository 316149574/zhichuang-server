const { Message } = require('../model/index');
const tool = require('../config/tool');
const addMessage = async (ctx) => {
    let { name, wechat, tel, need } = ctx.request.body;
    const findResult = await Message.find({ name, tel });
    if (findResult.length > 0) {

        ctx.status = 200;
        ctx.body = {
            code: 40001,
            mes: '不能重复提交留言!'
        }
    } else {
        // 正常提交
        const newMessage = new Message({
            name, wechat, tel, need, state: false, time: tool.getTime()
        });
        await newMessage.save().then(res => {
            ctx.status = 200
            ctx.body = {
                code: 200,
                mes: '留言成功，我们会第一时间联系您!',
                data: res
            }
        })

    }

}
const getMessage = async (ctx) => {
    let findResult = await Message.find();
    ctx.status = 200;
    ctx.body = {
        code: 200,
        mes: "获取留言列表成功",
        data: findResult
    }
}
const deleteMessage = async (ctx) => {
    const { _id } = ctx.request.body;
    await Message.deleteOne({ _id }).then((res) => {
        ctx.status = 200;
        ctx.body = {
            code: 200,
            mes: "删除留言成功"
        }
    });
}
const readMessage = async (ctx) => {
    const { _id } = ctx.request.body;
    await Message.findOneAndUpdate(
        { _id }, 
        {
           $set: {  state: true }
        },{},(err,data)=>{
            if(data){
                ctx.status = 200;
                ctx.body = {
                    code:200,
                    mes:'已查看'
                }
            }
        }
        
        );
}

module.exports = {
    addMessage,
    getMessage,
    deleteMessage,
    readMessage
}