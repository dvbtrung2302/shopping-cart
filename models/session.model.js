var mongoose = require('mongoose');

var sessionSchema = new mongoose.Schema({
  sessionId: String,
  cart: []
});

var Session = mongoose.model('Session', sessionSchema, 'sessions');

module.exports = Session;