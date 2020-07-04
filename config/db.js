const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const ConnectDB = async () => {
    try {
    
    mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
    console.log('MongoDB Connected...');
    } catch(err) {
        console.error(err);
    }
};

module.exports = ConnectDB; 