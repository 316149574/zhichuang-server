const  router= require('koa-router')();
router.prefix('/api');
const Company = require('../controller/company');
const CAbout= require('../controller/about');

router.post('/addcompanyinfo',Company.addCompanyInfo);
router.get('/getcompanyinfo',Company.getCompanyInfo);
router.post('/addabout',CAbout.addAbout);
router.get('/getabout',CAbout.getAbout);




module.exports = router;