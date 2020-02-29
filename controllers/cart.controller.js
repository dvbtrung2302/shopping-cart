var Session = require('../models/session.model');

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
