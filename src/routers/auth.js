const auth = require('express').Router();

const { login, register, forgotPassword } = require('../controllers/auth');

auth.post('/login', login);
auth.post('/register', register);
auth.post('/forgotpassword', forgotPassword);
module.exports = auth;