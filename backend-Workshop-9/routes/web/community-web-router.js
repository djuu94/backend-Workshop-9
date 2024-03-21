var express = require('express');
var router = express.Router();
const controller = require('../../controllers/web/community-web-controller.js')
const { requireAuth } = require('../../utils/passport')



router.get('/', requireAuth, controller.home)


module.exports = router;
