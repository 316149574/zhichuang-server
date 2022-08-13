const  router= require('koa-router')();
router.prefix('/api');
const Cuser = require('../controller/user');
/*
  @router POST    /api/register
  @des   用户注册接口
*/
router.post('/register',Cuser.registerUser);

/*
  @router  POST   /api/login
  @des   用户登陆接口    返回 token
*/
router.post('/login',Cuser.loginUser);


/*
 获取管理员列表
 @router  get   /api/getuser
 @des   获取管理员列表    返回用户列表
*/
router.get('/getuser',Cuser.getUser);



/*
 获取管理员列表
 @router  get   /api/deluser    
 @des   删除管理员   返回用户列表
*/
router.get('/deluser',Cuser.delUser);

/*
 用户登陆校验
 @router  post   /api/verifylogin    
 @des    code 200登陆状态   code 50001 token失效
*/
router.post('/verifylogin',Cuser.verifyLogin);

module.exports = router;