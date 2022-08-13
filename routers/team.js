const  router= require('koa-router')();
router.prefix('/api');
const Cteam = require('../controller/team');

router.post('/addteam',Cteam.addTeam);
router.get('/getteams',Cteam.getTeams);
router.post('/deleteteam',Cteam.deleteTeam);




module.exports = router;