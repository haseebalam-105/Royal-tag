const express = require('express');
const router  = express.Router();
const cartCtrl = require('../controllers/cartController');
const { isLoggedIn } = require('../middleware/auth');

// Add to cart – POST from product page
router.post('/add/:id', isLoggedIn, cartCtrl.addToCart);

// View cart page
router.get('/', isLoggedIn, cartCtrl.showCart);

// Remove an item
router.post('/remove/:id', isLoggedIn, cartCtrl.removeFromCart);

module.exports = router;
