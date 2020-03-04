var Product = require('../models/product.model');

module.exports.index = async function(req, res) {
  var currentPage = parseInt(req.query.page) || 1; //n
  var perPage = 8; // x
  var products = await Product.find();
  var start = (currentPage - 1) * perPage;
  var end = currentPage * perPage;
  var totalPage = Math.ceil(products.length / perPage);

  var pages = [];
  var currentPages = [];
  var activePage;
  var buySuccess = req.flash('buySuccess');
  var addSuccess = req.flash('addSuccess');
  
  if (currentPage === 1) {
    pages.push('Previous', currentPage, currentPage + 1, currentPage + 2, 'Next');
    currentPages.push('disabled', currentPage, currentPage + 1, currentPage + 2, currentPage + 1);
  } 
  if (currentPage > 1 && currentPage < totalPage) {
    pages.push('Previous', currentPage -1, currentPage, currentPage + 1, 'Next');
    currentPages.push(currentPage - 1, currentPage -  1, currentPage, currentPage + 1, currentPage + 1);
  }
  if (currentPage === totalPage) {
    pages.push('Previous', currentPage - 2, currentPage - 1, currentPage, 'Next');
    currentPages.push(currentPage - 1, currentPage - 2, currentPage - 1, currentPage, 'disabled');
  }

  res.render('products/index', {
    products: products.slice(start, end),
    pages: pages,
    currentPages: currentPages,
    activePage: currentPage,
    buySuccess: buySuccess,
    addSuccess: addSuccess
  });
};

module.exports.search = async function(req, res) {
  var products = await Product.find();

  var matchedProducts = products.filter(function(product) {
    return product.name.toLowerCase().indexOf(req.query.q.toLowerCase()) !== -1;
  });


  res.render('products/index', {
    products: matchedProducts,
  });};