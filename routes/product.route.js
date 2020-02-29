var express = require('express');
var controller = require('../controllers/product.controller');
var signinMiddleware = require('../middlewares/signin.middleware');


var router = express.Router();

router.get('/', signinMiddleware.hasSignin, controller.index);

router.get('/search', signinMiddleware.hasSignin, controller.search);
module.exports = router;