const Product = require('../models/Product');

// Helper to initialise cart in session
function getCart(req) {
  if (!req.session.cart) req.session.cart = { items: [], total: 0 };
  return req.session.cart;
}

exports.addToCart = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    if (!product) return res.redirect('back');

    const cart = getCart(req);
    const qty = parseInt(req.body.qty) || 1;
    
    // Check if product is already in cart
    const existingItem = cart.items.find(i => i.product._id.toString() === product._id.toString());
    if (existingItem) {
        existingItem.qty += qty;
    } else {
        cart.items.push({ product, qty });
    }
    cart.total += product.price * qty;
    
    res.redirect('/cart');
  } catch (e) {
    console.error(e);
    res.redirect('back');
  }
};

exports.showCart = (req, res) => {
  const cart = getCart(req);
  res.render('cart', { cart, user: req.session.user }); // added user variable if needed, but currentUser is local
};

exports.removeFromCart = (req, res) => {
  const cart = getCart(req);
  const idx = cart.items.findIndex(i => i.product._id.toString() === req.params.id);
  if (idx > -1) {
    cart.total -= cart.items[idx].product.price * cart.items[idx].qty;
    cart.items.splice(idx, 1);
  }
  res.redirect('/cart');
};
