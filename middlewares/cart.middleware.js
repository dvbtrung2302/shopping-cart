var Session = require('../models/session.model');

module.exports = async function(req, res, next) {
  var sessionId = req.signedCookies.sessionId;

  var item =  await Session.findOne({sessionId: sessionId});
  if(item) {
    var carts = item.cart;
    var totalQuantity = 0;
    
    if (!carts.length) {
      res.locals.cart = totalQuantity; 
    }

    for (var cart of carts) {
      totalQuantity += cart.quantity;
    }
    res.locals.cart = totalQuantity;
    next();
    return;
  } 

  next();
}