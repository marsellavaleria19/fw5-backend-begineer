const auth = require('express').Router();
const cors = require('cors');
const { login, register, forgotPassword, emailVerification } = require('../controllers/auth');

auth.post('/login', cors(), login);
auth.post('/register', register);
auth.post('/emailverification', emailVerification);
auth.post('/forgotpassword', forgotPassword);
module.exports = auth;