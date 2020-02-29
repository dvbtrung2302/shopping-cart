var shortId = require('shortid');
var Session = require('../models/session.model');

module.exports = async function(req, res, next) {
  var sessionId = req.signedCookies.sessionId;
  if (!sessionId) {
    var sessionId = shortId.generate();
    res.cookie('sessionId', sessionId, {
      signed: true
    });
    var data = {
      sessionId: sessionId
    }
    var session = new Session(data);
    session.save();
  };
  var item = await Session.findOne({sessionId: sessionId});
  var carts = item.cart;
  
  if (!carts.length) {
    next();
    return;
  }

  var totalQuantity = 0;
  for (var cart of carts) {
    totalQuantity += cart.quantity;
  }
  res.locals.cart = totalQuantity;
  next();
}