const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth/auth');

router.get('/login', auth.getLogin);

router.post('/login', auth.login);

router.get('/register', auth.getRegister);

router.post('/register', auth.register);

module.exports = router;
 
