const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Check if user is loggedIn
const isLoggedIn = require('../auth/isLoggedIn');

router.use(isLoggedIn);

/*===================================
    Index page route get all memes
=====================================*/ 
// Display all the products
router.get('/', async (req, res) => {

    // Check if user is loggedIn returns a boolean
    const userAuth = req.user? true: null;

    try {
        const products = await Product.find({}).sort({ createdAt: -1 });
        res.render('index', {
            products
        });
    } catch (err) {
        console.error(err);
    }
       
});

// Get all the products images by category
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.render('products/products', {
            products
        });
    } catch (err) {
        console.error(err);
    }
}); 

// Get individual products
router.get('/products/:id', async (req, res) => {

    try {
        const product = await Product.findById(req.params.id);
        res.render('products/product', {
            product
        });
    } catch (err) {
        console.error(err);
    }
});

 
module.exports = router;
  