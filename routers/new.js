const  router= require('koa-router')();
router.prefix('/api');
const Cnews = require('../controller/new');
/*
  @router POST    /api/addnews
  @des   新闻添加接口
*/
router.post('/addnews',Cnews.addNews);
router.get('/getnews',Cnews.getNews);
router.get('/deletenew',Cnews.deleteNew);




module.exports = router;