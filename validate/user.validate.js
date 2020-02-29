var User = require('../models/user.model');

module.exports.postSignup = async function(req, res, next) {
  var errors = [];
  var hasEmail = await User.findOne({ email: req.body.email });
  if (!req.body.name) {
    errors.push('Name is required.');
  }
  if (!req.body.phone) {
    errors.push('Phone is required.');
  }
  if (!req.body.email) {
    errors.push('Email is required.');
  }
  if (!req.body.password) {
    errors.push('Password is required.');
  }

  if (hasEmail) {
    errors.push('Email is already use');
  }

  if (errors.length) {
    res.render('users/signup', {
      errors: errors,
      values: req.body
    });
    return;
  }
  next();
}