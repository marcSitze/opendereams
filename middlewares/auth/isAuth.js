const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Check if there is a token in the cookies
    if(req.cookies.jwt === 'loggedout' || req.cookies.jwt === '' || req.cookies.jwt === null){
        return next();
    }
    
    if(!req.cookies.jwt){
        // console.log('You are not logged in and you have no token');
        // return res.status(401).json({ "msg": "You are not logged in and you have no token" });
        return next();
    } 
    let coke;
    coke = !req.cookies.jwt ? null: req.cookies.jwt;
    try {
        const decoded = jwt.verify(coke, 'my-secret');
        
        //console.log(decoded.user);
        req.user = decoded === null ? false : true;
      //  console.log(req.user.id);
     // console.log('User is logged in with id: ' + req.user.id);
        next();
    } catch(err) {
        console.error(err);
        return next();
    }

};