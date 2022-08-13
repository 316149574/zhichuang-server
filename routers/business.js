const  router= require('koa-router')();
router.prefix('/api');
const Cbusiness = require('../controller/business');

router.post('/addbusiness',Cbusiness.addBusiness);
router.get('/getbusiness',Cbusiness.getBusiness);
router.post('/deletebusiness',Cbusiness.deleteBusiness);




module.exports = router;