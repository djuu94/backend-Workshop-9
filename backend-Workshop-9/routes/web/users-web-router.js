var express = require('express');
var router = express.Router();
const controller = require('../../controllers/web/users-web-controller.js')
const { requireAuth } = require('../../utils/passport')



router.get('/:username', requireAuth, controller.home)


module.exports = router;
