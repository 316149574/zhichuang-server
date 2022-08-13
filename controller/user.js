const { User } = require('../model/index');
const tools = require('../config/tool');
const jwt = require('jsonwebtoken');
// 注册用户
const registerUser = async (ctx) => {
    const { username, password, tel, station } = ctx.request.body;

    const findResult = await User.find({ username });
    if (findResult.length > 0) {
        ctx.status = 200;
        ctx.body = {
            code: 20002,
            mes: '用户名已被占用,请换一个名字吧'
        }
    } else {
        // 可以注册
        const newUser = new User({
            username: username,
            password: tools.enbcrypt(password),
            tel: tel,
            station: station
        });
        await newUser.save().then(res => {
            ctx.status = 200;
            ctx.body = {
                code: 200,
                mes: '管理员添加成功，请记住您的密码!',
                data: res
            }
        }).catch(err => {
            console.log(err);
        });
    }
}


// 用户登陆
const loginUser = async (ctx) => {
    // 查询用户名是否存在
    const { username, password } = ctx.request.body;
    const findResult = await User.find({ username });
    if (findResult.length == 0) {
        // 未查询到 用户名不存在
        ctx.body = {
            code: 20001,
            mes: "用户名不存在"
        }
    } else {
        // 验证密码
        if (tools.debcrypt(password, findResult[0].password)) {
            // 登陆验证通过
            const payload = { _id: findResult[0]._id, username }
            const token = jwt.sign(payload, 'secret_zhichuang', {
                expiresIn: '24h'
            });
            ctx.status = 200;
            ctx.body = {
                code: 200,
                mes: "登陆成功",
                data: {
                    username,
                    token: "Bearer " + token
                }   // 此处一定要加 Beaerer
            }
        } else {
            // 密码不正确
            ctx.body = {
                code: 20001,
                mes: "密码不正确",
                data: {}
            }
        }
    }
}
// 管理员列表获取
const getUser = async (ctx) => {
    const findResult = await User.find();

    ctx.body = {
        code: 200,
        mes: "获取列表成功",
        data: findResult
    }
}

// 删除用户
const delUser = async (ctx) => {
    const { _id } = ctx.request.query;
    // 删除用户
   await User.remove({ _id }).then(res => {
        if (res.n > 0) {
            // 删除成功
            ctx.status= 200;
            ctx.body = {
                code: 200,
                mes: "删除成功"
            }
        }
    });
}
// 登陆校验
const verifyLogin = async (ctx) => {
    ctx.status = 200;
    ctx.body = {
        code :200,
        mes: '用户为登陆状态',
        data:{}
    }
}




module.exports = {
    registerUser,
    loginUser,
    getUser,
    delUser,
    verifyLogin
}