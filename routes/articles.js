const express = require('express');
const multer = require('multer');
const Article = require('./../models/Article');
const article = require('../controllers/article');
const auth = require('../middlewares/auth/auth');
const isAuth = require('../middlewares/auth/isAuth');
// const upload = require('./upload');
const router = express.Router();


router.get('/articles', isAuth, article.getAllArticles);

router.get('/articles/edit/:id', isAuth, article.getEditArticle);

router.get('/articles/:slug',isAuth, article.getSlugArticle);

// router.put('/articles/edit/:id', auth, article.editAndSaveArticle, saveArticleAndRedirect('edit'))

// router.delete('/articles/:id', article.deleteArticle);

// Post a comment
router.post('/b/blog/:slug', article.postComment);

function saveArticleAndRedirect(path) {
  
  return async (req, res) => {
    const storage = multer.diskStorage({
      destination: function(req, file, callback) {
          callback(null, './uploads');
      },
      filename: function(req, file, callback) {
          const ext = file.mimetype.split('/')[1];
          callback(null, `user-${Date.now()}.${ext}`);
      }
    });
    
    const multerFilter = (req, file, cb) => {
      if(file.mimetype.startsWith('image')){
          cb(null, true);
      }else{
          cb('Not an image! please upload an image or gid', false);
      }
    };
  const upload = multer({
      storage: storage,
      fileFilter: multerFilter
  }).single('image');
  upload(req, res, async function(err) {
      if(!req.file) {
          console.log('throw an error here');
      }
      console.log(req.body);
      console.log(req.file);
      let article = req.article
      article.title = req.body.title
      article.description = req.body.description
      article.markdown = req.body.markdown
      article.image = req.file.filename
      try {
        article = await article.save()
        console.log(article);
        res.redirect(`/articles/${article.slug}`)
      } catch (e) {
        console.log(e);
        res.render(`articles/${path}`, { article: article })
      }


  });

  }
}

module.exports = router;
