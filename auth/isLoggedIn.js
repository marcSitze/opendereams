const jwt = require('jsonwebtoken');
const config = require('config');
const jwtSecret = config.get('jwtSecret');
const newSecret = 'secret';
module.exports = (req, res, next) => {


    if(req.cookies.jwt == 'loggedout' || req.cookies.jwt == '' || req.cookies.jwt == null){
       
        return next();
    }

    if(!req.cookies.jwt){
        console.log('You are not logged in and you have no token')
        return res.send('you are not logged in and you have no token');
    }

    try {
        const decoded = jwt.verify(req.cookies.jwt, newSecret);
        //console.log(decoded.user);
        req.user = decoded.user;
      //  console.log(req.user.id);
     // console.log('User is logged in with id: ' + req.user.id);
       next();
    } catch(err) {
        //res.status(401).json({ msg: 'Token is not valid' });
        console.log('Token is invalid');
       res.redirect('/login');
       return next();
}

   // next();
 


};