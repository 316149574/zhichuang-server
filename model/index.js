const mongoose = require('mongoose');

// 用户
const userSchema = mongoose.Schema({
    username: String,
    password: String,
    tel:Number,
    station:String
});

const User = mongoose.model('users',userSchema);
//typeof User  function

// 案例
const caseSchema = mongoose.Schema({
    name:String,
    des:String,
    category:String,
    isbanner:{
        type:Boolean,
        default:false
    },
    bannerurl:{
        type:String,
        default:""
    },
    thumbnail:String,
    caseimgurl:Array,
    createtime:Date
});
const Case = mongoose.model('cases',caseSchema);


// 新闻
const newSchema = mongoose.Schema({
    title:String,
    des:String,
    category:String,
    thumbnail:String,
    content:String,
    createtime:String
});
const News= mongoose.model('news',newSchema);

// 团队
const teamSchema = mongoose.Schema({
    name:String,
    position:String,
    experience:String,
    thumbnail:String
});
const Team= mongoose.model('team',teamSchema);


// 案例
const businessSchema = mongoose.Schema({
    name:String,
    des:String,
    icon:String,
    content:String
});
const Business= mongoose.model('business',businessSchema);

// 公司信息
const CompanySchema = mongoose.Schema({
    name:String,
    logo:String,
    wechat:String,
    address:String,
    copyright:String,
    contacts:String,
    qq:String,
    map:String
});
const Company= mongoose.model('company',CompanySchema);


// About
const AboutSchema = mongoose.Schema({
    slogan:String,
    introduce:String,
    dev:String,
    idea:String,
    successcase:Number,
    experience:Number,
    teamnumber:Number,
    top:Number
});
const About= mongoose.model('about',AboutSchema);

// Banner
const BannerSchema = mongoose.Schema({
    bannerurl:String,
    title:String,
    bgcolor:String,
    des: String,
    link:String

});
const Banner= mongoose.model('banner',BannerSchema);


// Message
const MessageSchema = mongoose.Schema({
    name:String,
    wechat:String,
    tel:String,
    need:String,
    state:Boolean,
    time:String

});
const Message= mongoose.model('message',MessageSchema);



module.exports= {
    User,
    Case,
    News,
    Team,
    Business,
    Company,
    About,
    Banner,
    Message
}