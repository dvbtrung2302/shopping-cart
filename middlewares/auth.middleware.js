var User = require('../models/user.model');

module.exports.requireAuth = async function(req, res, next) {
  if (!req.signedCookies.userId) {
    res.redirect('/user/signin');
    return;
  }

  var user = await User.findById(req.signedCookies.userId);
  
  if (!user) {
    res.redirect('/user/signin');
    return;
  }

  res.locals.user = user;
  next();
};