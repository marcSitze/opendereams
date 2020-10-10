const multer = require('multer');
const Article = require('../models/Article');
const Comment = require('../models/comment');
const User = require('../models/user');

// getallarticles controller
exports.getAllArticles = async (req, res) => {
    const isAuth = req.user;
    try {
        const articles = await Article.find({});
        // const user = await User.findById(req.user.id) || null;
        const user = isAuth;
        // res.json({ 
        //     user,
        //     articles
        //  });
        console.log(req.user);
        res.render('articles/index', { articles, user });
    } catch (err) {
        console.error(err);
    }
   
}
 
// show create an article page controller
exports.getCreateArticle = (req, res) => {
    res.render('articles/new', { article: new Article() })
}
 
exports.getSlugArticle = async (req, res) => {
    const isAuth = req.user;
    const user = isAuth;
    const article = await Article.findOne({ slug: req.params.slug });
    const comments = await Comment.find({ article: article.id });
    if(article == null) return res.redirect('/articles');

    console.log(comments);
    res.render('articles/show', { 
        article,
        comments,
        user
     });
};

// create an article
exports.createArticle = async (req, res, next) => {
    req.article = new Article()
    next();
};

exports.getEditArticle = async (req, res) => {
    const article = await Article.findById(req.params.id)
  res.render('articles/edit', { article: article })
}

exports.editAndSaveArticle = async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next();
} 

exports.deleteArticle = async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/articles')
}

exports.postComment = async (req, res) => {
    const { email, message } = req.body;
    const article = await Article.find({ slug: req.params.slug });
    const comments = await Comment.find({ article: article.id });
    let comment;
    comment = new Comment({
        email,
        message,
        article: article[0]._id
    });
    try{
        
        const newComment = await comment.save();
    
         res.redirect(`/articles/${article[0].slug}`)
    } catch(err) {
        console.error(err);
    }
};
