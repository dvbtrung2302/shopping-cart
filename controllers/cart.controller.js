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

module.exports.reduceByOne = async function(req, res) {
  var productId = req.params.productId;
  var sessionId = req.signedCookies.sessionId;

  if (!sessionId) {
    res.redirect('/');
    return;
  }

  function removeElement(array, elem) {
    var index = array.indexOf(elem);
    if (index > -1) {
        array.splice(index, 1);
    }
  };

  var session = await Session.findOne({ sessionId: sessionId });
  var carts = session.cart;
  var errors = [];
  var newCarts = carts.map(function(cart) {
    if (cart.productId === productId) {
      cart.productId = productId;
      cart.quantity = cart.quantity - 1;
      if (cart.quantity <= 0) {
        cart.quantity = 0;
      } 
      return cart;
    }   
    return cart; 
  });

  for (var cart of newCarts) {
    if (cart.quantity === 0) {
      removeElement(newCarts, cart);
    }
  } 

  await Session.findOneAndUpdate({sessionId: sessionId}, {$set:{cart:newCarts}}, {new: true});
  res.redirect('/cart');
};