const express = require('express');
const router = express.Router();
const multer = require('multer');
const Article = require('../models/Article');
const path = require('path');
const fs = require('fs');
const isAuth = require('../middlewares/auth/isAuth');

// multer config
const storage = multer.diskStorage({

    destination: function(req, file, callback) {

      callback(null, './ups');
  },
    filename: function (req, file, callback) {

      //  console.log(req.user);
        const ext = file.mimetype.split('/')[1];
         callback(null, `article-${Date.now()}.${ext}`);
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


// get the Add product page
router.get('/create', async (req, res) => {   
    // render the create product page

   try {
    res.render('admin/create', {
        article: new Article()
    });
   } catch (error) {
       console.error(error);
   }
    
}); 
 
// create a new product
router.post('/create', (req, res) => {
    const errors = [];
    let article;

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
        const { title, description, markdown } = req.body;
        if(!title){
            errors.push({ msg: "please enter the article title" });
        }
        if(!description){
            errors.push({ msg: "please enter the article description" });
        }
        if(!markdown){
            errors.push({ msg: "please enter the article markdown" });
        }
        if(!req.file){
            errors.push({ msg: "please upload an image" });
        }    
    
        // console.log(req.file);

      
        article = new Article({ 
            title,
            description,
            markdown,
            image: req.file.filename
        });
        if(!title || !description || !req.file || !markdown) {
            //res.render('partials/product');
            console.log(article);
            if(article.image != null){
                fs.unlink(path.join('ups', article.image), function(err){
                    if(err) console.error(err);
                });
            }
            return res.render('admin/create', {
                errors,
                article
            });
        }
        try{
          const newArticle = await article.save();
        //    res.send(newArticle);
        // res.redirect(`/admin/products/${article.id}`);
        res.redirect(`/articles/${article.slug}`)
           console.log('product created...');
        }catch(err){
            console.error(err);
            return res.render('admin/create', {
                errors,
                article
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

// render the edit product page
router.get('/edit/:id', async (req, res) => {
    // render the create product page
    // res.send('edit a product');
    let article;
    try{
        article = await Article.findById(req.params.id);
        res.render('admin/edit', {
            article
        });
    } catch(err) {
        console.error(err);
    }
});
// Edit a product 
router.put('/articles/edit/:id', async (req, res) => {
    // render the create product page
    // res.send('edit a product');

    const errors = [];
    let article;
 
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
        const { title, description, markdown } = req.body;
        if(!title){
            errors.push({ msg: "please enter the article title" });
        }
        if(!description){
            errors.push({ msg: "please enter the article description" });
        }
        if(!markdown){
            errors.push({ msg: "please enter the article markdown" });
        }
        if(!req.file){
            errors.push({ msg: "please upload an image" });
        }   
    
       const uarticle = { 
            title,
            description,
            markdown,
            image: req.file.filename
        };
        if(!title || !description || !markdown || !req.file) {  

            if(article.image != null){
                fs.unlink(path.join('ups', article.image), function(err){
                    if(err) console.error(err);
                });
            }
            return res.render(`admin/edit`, {
                errors,
                article: uarticle
            });
        }
        try{
            article = await Article.findById(req.params.id);
            if(article){
                if(article.image != null){
                    fs.unlink(path.join('ups', article.image), function(err){
                        if(err) console.error(err);
                    });
                }
                article = await Article.findOneAndUpdate(
                    { _id: req.params.id },
                    { $set: uarticle },
                    { new: true }
                    );
                console.log('article updated...');
                return res.redirect(`/articles/${article.slug}`);
                
            }
            // create new product if not seen 
            article = new Article(uarticle);
            await article.save();
            // res.json(article);
            res.redirect(`/articles/${article.slug}`)
        }catch(err){
            console.error(err);
            return res.render(`admin/edit`, {
                errors,
                article
            });
        }
    });
}); 
   
// Delete a product
router.delete('/articles/:id', async (req, res) => {
    let article;
    try{
        article = await Article.findById(req.params.id);
        if(article){
            if(article.image != null){
                fs.unlink(path.join('ups', article.image), function(err){
                    if(err) console.error(err);
                });
            }
            await article.remove();
        //    return res.send('article deleted');
            return res.redirect('/articles');
        }
        // res.send('deleted...');
        console.log('article deleted...');
        res.redirect('/articles');
    }catch(err){
        console.error(err);
    }
});


module.exports = router;


