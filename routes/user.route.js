var express = require('express');
var controller = require('../controllers/user.controller');
var validate = require('../validate/user.validate');
var authMiddleware = require('../middlewares/auth.middleware');

var router = express.Router();

router.get('/', authMiddleware.requireAuth, controller.index);

router.get('/signup', controller.signup);

router.get('/signin', controller.signin);

router.post('/signup', validate.postSignup, controller.postSignup);

router.post('/signin', controller.postSignin);
module.exports = router;