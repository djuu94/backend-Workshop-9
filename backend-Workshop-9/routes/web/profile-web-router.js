var express = require('express');
var router = express.Router();
const controller = require('../../controllers/web/profile-web-controller.js')
const { requireAuth } = require('../../utils/passport')
/* GET home page. */
router.get('/', requireAuth, controller.home)


router.post('/start-path/:id', controller.startPath)


module.exports = router;
