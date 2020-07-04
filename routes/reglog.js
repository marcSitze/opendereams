const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const jwtSecret = config.get('jwtSecret');
const newSecret = 'secret';
const User = require('../models/Users');
const bcrypt = require('bcryptjs');

// const isLoggedIn = require('../auth/isLoggedIn');

//  router.use(isLoggedIn);

/*===========================
         REGISTER
============================*/ 
router.get('/register', (req, res) => {
   // to check if user is loggedin
   const userAuth = null;
   res.render('register/register', {
      user: new User(),
      title: 'Register',
      userAuth
   });
});   
 
router.post('/register', async (req, res) => {
   const errors = [];

   const { name, email, address, password } = req.body;
   
   let user;
   try { 
      // to check if user is loggedin
    const userAuth = null;
      // 1 check if user exists
      user = await User.findOne({ email });

      if(user) {
         errors.push({ msg: "User already exists"});
         return res.status(400).render('register/register', {
            user: new User(),
            errors,
            title: 'Register',
            userAuth
         });
      }   
      if(!name){
         errors.push({ msg: 'Please enter the Username'});
      }
      if(!email){
         errors.push({ msg: 'Please enter the email'});
      }
      if(!address){
         errors.push({ msg: 'Please enter the address'});
      }
      if(!password){
         errors.push({ msg: 'Please enter your password'});
      }

      user = new User({
         name,
         email,
         address,
         password
      });

      if(!name || !email || !address || !password){
        return res.render('register/register', {
           user,
           errors,
           title: 'Register',
           userAuth
         });
      }

       
// 2 Encrypt password
      // Hash user password
     const salt = await bcrypt.genSalt(10);

     user.password = await bcrypt.hash(password, salt);

         // return user registered successfully
    await user.save();
      
         // 3 return jsonwebtoken
         const payload = {
           user: {
            id: user.id
           }
         };
         
         jwt.sign(
            payload,
            newSecret,
            {
               expiresIn: 3600000
            },
            (err, token) => {
               if(err) throw err;
               // res.render('register/login');
              // res.json({ token });
               res.redirect('/login');
            }
         );
         console.log('You are signed in');
   } catch(err) {
      res.send('server error');
      console.error(err);
   }
   
});

/*===========================
         LOGIN
============================*/ 
router.get('/login', (req, res) => {

   // to check if user is loggedin
   const userAuth = null;

   res.render('register/login', {
      title: 'Login',
      userAuth
   });
});
 
router.post('/login', async (req, res) => {

// to check if user is loggedin
const userAuth = null;

   const { email, password } = req.body;
   const errors = [];

   if(!email){
      errors.push({ msg: 'Please enter your email'});
   }
   if(!password){
      errors.push({ msg: 'Please enter your password'});
   }

   if(!email || !password){
     return res.render('register/login', {
      errors,
      title: 'Login',
      userAuth
      });
   } 

   try {
      let user = await User.findOne({ email });
      if(!user) {
         errors.push({ msg: 'Invalid credidentials'});
         return res.status(400).render('register/login', {
           errors,
            title: 'Login',
            userAuth
         });
      }
     
         const isMatch = await bcrypt.compare(password, user.password);
         
         if(!isMatch) {
            errors.push({ msg: 'Invalid credidentials'});
            return res.status(400).render('register/login', {
            errors,
            title: 'Login',
            userAuth
         });
         }
         const payload = {
            user: {
               id: user.id
            }
         };
   
         jwt.sign(
            payload,
            newSecret,
            {
               expiresIn: 3600000
            },
            (err, token) => {
               if(err) throw err;
               res.cookie('jwt', token, { expires: new Date(
                  Date.now() + 90 * 24 * 60 * 60 * 1000
                ),
                 httpOnly: true
               });
   
               // res.status(200).json({
               //    status: 'success',
               //    token,
               //    data: {
               //       user
               //    }
               //  }); 
            res.status(200).redirect('/me'); 

            }
         );
         console.log('You are logged in');
      
   } catch(err) {
      console.error(err);
   }
   
});

module.exports = router;