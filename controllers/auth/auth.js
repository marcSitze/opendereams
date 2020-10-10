const jwt = require('jsonwebtoken');
const User = require('../../models/user');
// require('config');

exports.getLogin = (req, res) => {

    res.render('auth/login');
};

exports.getRegister = async (req, res) => {

    res.render('auth/register');
  
};

exports.register = async (req, res) => {
    const { email, password } = req.body;

    let user;
    try {
        user = await User.findOne({ email });

        if(user){
            return res.status(400).json({ msg: "user already exists" });
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
       res.status(201).json({ token, user });
    } catch(err) {
        console.error(err);
    }
   
};


exports.login = async (req, res) => {
   const { email, password } = req.body;
   let user = await User.findOne({ email });

   if(!user){
       return res.status(400).json({
           "msg": "this login is not valid"
       });
   }

   const isMatch = password === user.password;

   if(!isMatch){
     return res.status(400).json({
        "msg": "this login is not valid"
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
   return res.json({ token, user });
};