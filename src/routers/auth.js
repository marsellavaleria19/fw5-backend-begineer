const auth = require('express').Router();
const { login, register, forgotPassword, emailVerification } = require('../controllers/auth');

auth.post('/login', login);
auth.post('/register', register);
auth.post('/emailverification', emailVerification);
auth.post('/forgotpassword', forgotPassword);
module.exports = auth;