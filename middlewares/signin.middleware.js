var User = require('../models/user.model');

module.exports.hasSignin = async function(req, res, next) {
  var user = await User.findById(req.signedCookies.userId);
  res.locals.user = user;

  next();
};