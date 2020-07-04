const express = require('express');
const path = require('path');
const ejs = require('ejs');
const ConnectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const port = process.env.PORT || 5000;
const app = express();

// import routes
const indexRoute = require('./routes/index');
const reglogRoute = require('./routes/reglog');
const uploadRoute = require('./routes/upload');
const adminRoute = require('./routes/admin');
const meRoute = require('./routes/me');

// To parse form data
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));

// Connect to mongo database
ConnectDB();

// to display our web pages  
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// middlewares
app.use(cookieParser());
app.use(methodOverride('_method'));

// static folders
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/ups')));
 
// app.use((req, res, next) => {
//     req.requestTime = new Date().toISOString(); 
//     console.log(req.headers); 
// });
   
// Display all the videos and images
app.use('/', indexRoute);
app.use('/', reglogRoute);
app.use('/admin', adminRoute);
app.use('/upload', uploadRoute);
app.use('/me', meRoute);

// create server 
app.listen(port, () => console.log('Server is listening on port ' + port));  