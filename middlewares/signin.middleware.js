var User = require('../models/user.model');

module.exports.hasSignin = async function(req, res, next) {
  if (!req.signedCookies.userId) {
    next();
    return;
  }

  var user = await User.findById(req.signedCookies.userId);
  res.locals.user = user;

  if (!user) {
    res.redirect('/user/signin');
    return;
  }

  next();
};