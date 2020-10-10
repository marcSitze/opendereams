const jwt = require('jsonwebtoken');
const User = require('../../models/user');
// require('config');

exports.getLogin = (req, res) => {

    res.render('auth/login', {
        user: new User()
    });
};

exports.getRegister = async (req, res) => {

    res.render('auth/register', {
        user: new User()
    });
  
};

exports.register = async (req, res) => {
    const { email, password } = req.body;
    const errors = [];
    let user;
    try {
        user = await User.findOne({ email });

        if(user){
            errors.push({ msg: "user already exists" })
            // return res.status(400).json({ msg: "user already exists" });
            return res.render('auth/register', {
                user: new User(),
                errors
            });
        }

        user = new User({
            email,
            password
        });
        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        let token = await jwt.sign(payload, 'my-secret');
        // console.log(token);
        res.cookie('jwt', token, { expires: new Date(
            Date.now() + 90 * 24 * 60 * 60 * 1000
          ),
           httpOnly: true
         });
    //    res.status(201).json({ token, user });
         res.redirect('/articles');
    } catch(err) {
        console.error(err);
    }
   
};


exports.login = async (req, res) => {
   const { email, password } = req.body;
   let user = await User.findOne({ email });
    let errors = [];
   if(!user){
       errors.push({ msg: "these credidentials are not valid" });
    //    return res.status(400).json({
    //        "msg": "this login is not valid"
    //    });
    return res.status(400).render('auth/login', {
        errors,
        user: new User()
    });
   }

   const isMatch = password == user.password ? true: false;

   if(!isMatch){
    errors.push({ msg: "these credidentials are not valid" });
    //  return res.status(400).json({
    //     "msg": "this login is not valid"
    //  });
     return res.status(400).render('auth/login', {
        errors,
        user: new User()
    });
   }

    const payload = {
        user: {
            id: user.id
        }
    };

    let token = await jwt.sign(payload, 'my-secret');
    res.cookie('jwt', token, { expires: new Date(
        Date.now() + 90 * 24 * 60 * 60 * 1000
      ),
       httpOnly: true
     });
//    return res.json({ token, user });
      return res.redirect('/articles');
};