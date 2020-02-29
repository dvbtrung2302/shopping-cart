require('dotenv').config();
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var csurf = require('csurf');

var port = 3000;

var productRoute = require('./routes/product.route');
var userRoute = require('./routes/user.route');
// Default setting
mongoose.connect(process.env.MONGO_URL);

app.set('views', './views');
app.set('view engine', 'pug');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRECT));
app.use(csurf({ cookie: true }));

//Routes
app.use('/', productRoute);
app.use('/user', userRoute);
app.listen(port, function() {
  console.log('Server listening on port ' + port);
});

