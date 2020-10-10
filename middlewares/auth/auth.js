const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    // Get token from the header
    let token;
    // if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        
    //     token = req.headers.authorization.split(' ')[1];
    // }

    // if(!token){
    //     return res.status(401).json({ msg: "No token, Not authorized..." });
    // }
    if(req.cookies.jwt){
        token = req.cookies.jwt;
    }

    if(req.cookies.jwt === 'loggedout' || req.cookies.jwt === '' || req.cookies.jwt === null){
        return next();
    }
    
    if(!req.cookies.jwt){
        // console.log('You are not logged in and you have no token');
        // return res.status(401).json({ "msg": "You are not logged in and you have no token" });
        return next();
    } 

    // console.log(token);
    try {
        const decoded = jwt.verify(token, 'my-secret');
        req.user = decoded.user;
        console.log(req.user);
    next();
    } catch (err) {
        console.error(err);
        res.json({ msg: "something went wrong" });
        return next();
    }

};  
