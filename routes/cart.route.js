var express = require('express');

var controller = require('../controllers/cart.controller');
var router = express.Router();

router.get('/', controller.index);

router.get('/add/:productId', controller.addToCart);

router.get('/reduce/:productId', controller.reduceByOne);

router.get('/remove-all/:productId', controller.removeAll);

module.exports = router;