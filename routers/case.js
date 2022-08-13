const  router= require('koa-router')();
router.prefix('/api');
const Ccase = require('../controller/case');

/*
  @router POST    /api/addcase
  @des   用户注册接口
*/
router.post('/addcase',Ccase.addCase);


router.get('/caselist',Ccase.caseList);

router.post('/deletecase',Ccase.deleteCase);

module.exports = router;