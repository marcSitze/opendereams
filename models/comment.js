const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
        // required: true
    }
});

module.exports = mongoose.model('Comment', CommentSchema);