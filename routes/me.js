const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
// const config = require('config');
// const jwtSecret = config.get('jwtSecret');
const User = require('../models/Users');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
// Check if user is login
const auth = require('../auth/auth');

router.use(auth);
// Show the shopping cart
router.get('/', async (req, res) => {
    // res.send('all your selected products');
    console.log(req.user.id);
    // res.send('this is the user profile');
    try {
        const user = await User.findById(req.user.id);
        const cart = await Cart.findById({ user: req.user.id });
        // console.log(user);
        res.send(user);
    } catch (err) {
        console.error(err);
    }
});

router.get('/cart', async (req, res) => {
    let userCart = [];
    try {
      const carts = await Cart.find({});
     carts.forEach(cart => {
         if(cart.user == req.user.id){
             userCart.push(cart);
            // console.log(cart);
         }
     });

      res.send(userCart);
    } catch (err) {
     console.error(err);   
    }
});

// Add a product to the shopping cart
router.post('/cart', async (req, res) => {

    const cart = new Cart({
        user: req.user.id,
        product: req.body.productId
    });
    try {
        await cart.save();
        console.log('product added to shopping cart');
        res.send('product added to shopping cart');
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;