var express = require('express');

var controller = require('../controllers/cart.controller');
var authMiddleware = require('../middlewares/auth.middleware');

var router = express.Router();

router.get('/', controller.index);

router.get('/add/:productId', controller.addToCart);

router.get('/reduce/:productId', controller.reduceByOne);

router.get('/remove-all/:productId', controller.removeAll);

router.get('/checkout', authMiddleware.requireAuth ,controller.checkout);

router.post('/checkout', controller.postCheckout);

module.exports = router;