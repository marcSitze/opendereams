const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejs = require('ejs');
// const ConnectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const port = process.env.PORT || 5000;
const app = express();
require('dotenv').config();
const routes = require('./routes/index');
const summerRoute = require('./routes/summerForm');
// const chihuahuaRoute = require('./routes/chihuahuaForm');
// const articlesRouter = require('./routes/articlesRouter');
const artRouter = require('./routes/articles');
const auth = require('./routes/auth');
const adminRoute = require('./routes/admin');

// Connection to database
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
  }).then(() => console.log('Mongodb connected...'))
  .catch(err => console.log(err));

// To parse form data
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));

// Connect to mongo database
// ConnectDB();

// to display our web pages  
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// middlewares
app.use(cookieParser());
app.use(methodOverride('_method'));

// static folders
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/ups')));
 
app.use('/', artRouter);
app.use('/', routes);
app.use('/summer', summerRoute);
// app.use('/chihuahua', chihuahuaRoute);
app.use('/', auth);
app.use('/admin', adminRoute);

// create server 
app.listen(port, () => console.log('Server is listening on port ' + port));  