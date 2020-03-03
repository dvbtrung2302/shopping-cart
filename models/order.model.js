var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  cart: [],
  total: Number,
  userId: String
});

var Order = mongoose.model('Order', orderSchema, 'orders');

module.exports = Order;