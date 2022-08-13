const  router= require('koa-router')();
router.prefix('/api');
const CMessage = require('../controller/message');

router.post('/addmessage', CMessage.addMessage);
router.get('/getmessage', CMessage.getMessage);
router.post('/deletemessage', CMessage.deleteMessage);
router.post('/readmessage', CMessage.readMessage);



module.exports = router;