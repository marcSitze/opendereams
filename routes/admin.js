const express = require('express');
const router = express.Router();
const multer = require('multer');
const Product = require('../models/Product');
const path = require('path');
const fs = require('fs');
const Category = require('../models/Category');

// multer config
const storage = multer.diskStorage({

    destination: function(req, file, callback) {

      callback(null, './ups');
  },
    filename: function (req, file, callback) {

      //  console.log(req.user);
        const ext = file.mimetype.split('/')[1];
         callback(null, `product-${Date.now()}.${ext}`);
        // callback(null, `user-${Date.now()}.${ext}`);

 }
   
});
const multerFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image')){ 
        cb(null, true);
    }else {
        cb('Not an image! please upload an image or gif', false);
    }
};



// Display admin panel
router.get('/', async (req, res) => {
    // render the admin template 
    // res.send('here is the admin route');
    try{
        const products = await Product.find({});
        res.render('admin/index', {
            products
        });
    } catch(err) {
        console.error(err);
    }
    
});

// get the Add product page
router.get('/create', async (req, res) => {   
    // render the create product page
    let categories = await Category.find({});
   try {
    res.render('admin/create', {
        product: new Product(),
        categories
    });
   } catch (error) {
       console.error(error);
   }
    
}); 
 
// create a new product
router.post('/create', (req, res) => {
    const errors = [];
    let product;

    const upload = multer({
        storage: storage,
        fileFilter: multerFilter
    }).single('image');

      upload(req, res, async function(err){
        
        if(err) {
            errors.push({ msg: "please enter a valid image format" });
            console.log('Error uploading file.');
         }
        // console.log(req.body);
        const { name, price, category, quantity, image, description } = req.body;
        if(!name){
            errors.push({ msg: "please enter the product name" });
        }
        if(!price){
            errors.push({ msg: "please enter the product price" });
        }
        if(!category){
            errors.push({ msg: "please enter the product category" });
        }
        if(!quantity){
            errors.push({ msg: "please enter the product quantity" });
        }
        if(!req.file){
            errors.push({ msg: "please upload an image" });
        }    
        if(!description){
            errors.push({ msg: "please enter the product description" });
        }
        // console.log(req.file);
       
        product = new Product({ 
            name,
            price,
            category,
            quantity,
            image: req.file.filename,
            description
        });
        if(!name || !price || !category || !req.file || !description) {
            //res.render('partials/product');
            if(product.image != null){
                fs.unlink(path.join('ups', product.image), function(err){
                    if(err) console.error(err);
                });
            }
            return res.render('admin/create', {
                errors,
                product
            });
        }
        try{
          const newProduct = await product.save();
        //    res.send(newProduct);
        res.redirect(`/admin/products/${product.id}`);
           console.log('product created...');
        }catch(err){
            console.error(err);
            return res.render('admin/create', {
                errors,
                product
            });
        }
    });

    // res.send('new product created');
});

// get all the products (manage products)
router.get('/products', async (req, res) => { 
    try{
        const products = await Product.find({});
        res.render('admin/products', {
            products
        });
    }catch(err) {
        console.error(err);
    }
 
});

// Get a specific product
router.get('/products/:id', async (req, res) => {
    // render the create product page
    try{
        const categories = await Category.find({});
        const product = await Product.findById(req.params.id);
        console.log(product);
        res.render('admin/product', {
            product,
            categories
        });
    } catch(err) {
        console.error(err);
    }

});
// render the edit product page
router.get('/products/:id/edit', async (req, res) => {
    // render the create product page
    // res.send('edit a product');
    let product;
    try{
        const categories = await Category.find({});
        product = await Product.findById(req.params.id);
        res.render('admin/edit', {
            product,
            categories
        });
    } catch(err) {
        console.error(err);
    }
});
// Edit a product 
router.put('/products/:id', async (req, res) => {
    // render the create product page
    // res.send('edit a product');

    const errors = [];
    let product;

    const upload = multer({
        storage: storage,
        fileFilter: multerFilter
    }).single('image');

      upload(req, res, async function(err){
        
        if(err) {
            errors.push({ msg: "please enter a valid image format" });
            console.log('Error uploading file.');
         }
        // console.log(req.body);
        const { name, price, category, quantity, image, description } = req.body;
        if(!name){
            errors.push({ msg: "please enter the product name" });
        }
        if(!price){
            errors.push({ msg: "please enter the product price" });
        }
        if(!category){
            errors.push({ msg: "please enter the product category" });
        }
        if(!quantity){
            errors.push({ msg: "please enter the product quantity" });
        } 
        if(!description){
            errors.push({ msg: "please enter the product description" });
        }
        // console.log(req.file);
        if(!req.file){
            errors.push({ msg: "please upload an image" });
            return res.render('admin/edit', {
                errors,
                product: req.body
                
            });
        }    
    
       const uproduct = { 
            name,
            price,
            category,
            quantity,
            image: req.file.filename,
            description
        };
        if(!name || !price || !category || !req.file || !description) {  

            if(product.image != null){
                fs.unlink(path.join('ups', product.image), function(err){
                    if(err) console.error(err);
                });
            }
            return res.render(`admin/edit`, {
                errors,
                product: uproduct
            });
        }
        try{
            const categories = await Category.find({});
            product = await Product.findById(req.params.id);
            if(product){
                if(product.image != null){
                    fs.unlink(path.join('ups', product.image), function(err){
                        if(err) console.error(err);
                    });
                }
                product = await Product.findOneAndUpdate(
                    { _id: req.params.id },
                    { $set: uproduct },
                    { new: true }
                    );
                console.log('product updated...');
                return res.json(product);
                
            }
            // create new product if not seen 
            product = new Product(uproduct);
            await product.save();
            res.json(product);
        }catch(err){
            console.error(err);
            return res.render(`admin/edit`, {
                errors,
                product
            });
        }
    });
}); 
 
// Delete a product
router.delete('/products/:id', async (req, res) => {
    let product;
    try{
        product = await Product.findById(req.params.id);
        if(product){
            if(product.image != null){
                fs.unlink(path.join('ups', product.image), function(err){
                    if(err) console.error(err);
                });
            }
            await product.remove();
           return res.send('product deleted');
        }
        res.send('deleted...');
    }catch(err){
        console.error(err);
    }
});

// Render the create category page
router.get('/category', async (req, res) => {
    let categories; 
    try {
        categories = await Category.find({});
        res.render('admin/category', {
            categories
        })
    } catch (error) {
        console.error(error);
    }
});

// Create a new category
router.post('/category', async (req, res) => {
    let errors = [];
    let category;
    try {
        const categories = await Category.find({});
        if(!req.body.category){
            errors.push({ msg: "Please enter a category" });
            return res.render('admin/category', {
                errors,
                categories
            });
        }
        
        category = await Category.findOne({ name: req.body.category });
        if(category){
            errors.push({ msg: "This category already exists" });
            return res.render('admin/category', {
                errors,
                categories
            });
        }

        category = new Category({
            name: req.body.category
        });

        await category.save();
        console.log('Category created...');
        res.redirect('/admin/category');

    } catch (error) {
        console.error(error);
    }
});


module.exports = router;