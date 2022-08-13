const  router= require('koa-router')();
router.prefix('/api');
const CBanner = require('../controller/banner');
router.post('/addbanner',CBanner.addBanner);

router.get('/getbannerlist',CBanner.getBannerList);
router.post('/deletebanner',CBanner.deleteBanner);




module.exports = router;