const controller = require('../../controllers/web/login-web-controller')
var express = require('express');
var router = express.Router();
const { passport } = require('../../utils/passport')
router.get('/', controller.home)

router.post('/', passport.authenticate('local', {
    failureRedirect: "/login",
    failureFlash: { type: 'danger', message: 'Fel användarnamn eller lösenord' }
}), controller.loginUser)

router.post('/register', controller.registerUser)

module.exports = router;