var User = require('../models/user.model');
var md5 = require('md5');

module.exports.index = async function(req, res) {
  res.render('users');
};

module.exports.signup = function(req, res) {
  res.render('users/signup', { 
    csrfToken: req.csrfToken()
  });
}

module.exports.postSignup = async function (req, res) {
  req.body.password = md5(req.body.password);
  var user = await new User(req.body);
  await user.save();
  res.redirect('/')
}

module.exports.signin = function(req, res) {
  res.clearCookie('userId');
  res.render('users/signin', {
    csrfToken: req.csrfToken()
  });
}

module.exports.postSignin = async function(req, res) {
  var user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.render('users/signin', {
      errors: [
        'User does not exist.'
      ],
      values: req.body,
      csrfToken: req.csrfToken()
    });
    return;
  }

  hashedPassword = md5(req.body.password);

  if(hashedPassword !== user.password) {
    res.render('users/signin', {
      errors: [
        'Wrong password.'
      ],
      values: req.body,
      csrfToken: req.csrfToken()
    });
    return;
  }

  res.cookie('userId', user.id, {
    signed: true
  });

  res.locals.user = user;

  res.render('users/index');
}

