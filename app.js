const Koa = require('koa');
const app = new Koa();
const mongodConnect=require('./db');
const json= require('koa-json');
const bodyparser = require('koa-bodyparser');
const cors = require('koa2-cors');
const static = require('koa-static');

const user = require('./routers/user');
const upload = require('./routers/upload');
const cases= require('./routers/case'); 
const news= require('./routers/new');
const team= require('./routers/team');
const business= require('./routers/business');
const company= require('./routers/company');
const banner= require('./routers/banner');
const message= require('./routers/message');

const koajwt = require('koa-jwt');

app.use( static(__dirname+'/public'));
app.use(cors());
app.use(async (ctx,next)=>{
    await next().catch(err=>{
       if(err.status == 401){
           ctx.status=200;
           ctx.body = {
               code:50001,
               mes:"token认证失败"
           }
       }else{
           throw err
       }
    })
 })
app.use(koajwt({
    secret:'secret_zhichuang'
}).unless({
    path:[
        /^\/api\/login/,
        /^\/api\/register/,
        /^\/api\/getbannerlist/,
        /^\/api\/getbusiness/,
        /^\/api\/caselist/,
        /^\/api\/getcompanyinfo/,
        /^\/api\/getabout/,
        /^\/api\/addmessage/,
        /^\/api\/getnews/,
        /^\/api\/getteams/
    ]
}));

mongodConnect(); // 链接数据库


app.use(json());
app.use(bodyparser({
    enableTypes:['json', 'form', 'text']
}))


app.use(user.routes(), user.allowedMethods())
app.use(upload.routes(), upload.allowedMethods())
app.use(cases.routes(), cases.allowedMethods())
app.use(news.routes(), news.allowedMethods())
app.use(team.routes(), team.allowedMethods())
app.use(business.routes(), business.allowedMethods())
app.use(company.routes(), company.allowedMethods())
app.use(banner.routes(), banner.allowedMethods())
app.use(message.routes(), message.allowedMethods())
app.listen(3000,()=>{
    console.log('Start Server.....');
});