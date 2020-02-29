var Session = require('../models/session.model');
var Product = require('../models/product.model');

module.exports.addToCart = async function(req, res) {
  var productId = req.params.productId;
  var sessionId = req.signedCookies.sessionId;

  if (!sessionId) {
    res.redirect('/');
    return;
  }

  var newItem = await Session.findOne({sessionId: sessionId});
  var data = {
    productId,
    quantity: 0
  };
  var carts = newItem.cart;
  if (carts.length === 0) {
    data.productId = productId;
    data.quantity = 1;
    carts.push(data);
  } else {
    var matchedProductId = carts.find(function(cart) {
      return cart.productId === productId;
    });
    if (!matchedProductId) {
      data.productId = productId;
      data.quantity = 1;
      carts.push(data);
    } else {
      for (var cart of carts) {
        if (cart.productId === productId) {
          cart.quantity += 1;
        }
      }
    }
  }

  await Session.findOneAndUpdate({sessionId: sessionId}, {$set:{cart:carts}}, {new: true});

  res.redirect('/');
}

module.exports.index = async function(req, res) {
  var productId = req.params.productId;
  var sessionId = req.signedCookies.sessionId;
  var totalPrice = 0
  
  if (!sessionId) {
    res.redirect('/');
    return;
  }

  var session = await Session.findOne({ sessionId: sessionId });
  var carts = session.cart;

  for (var cart of carts) {
    var product = await Product.findById(cart.productId);
    cart.productName = product.name;
    cart.productPrice = product.price;
    totalPrice += (cart.productPrice * cart.quantity);
  }

  res.render('cart', {
    carts: carts,
    total: totalPrice
  });

};
