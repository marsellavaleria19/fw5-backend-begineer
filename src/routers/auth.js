const auth = require('express').Router();
const {verifyAll} = require('../helpers/auth');

const { login, register,refreshForToken, forgotPassword, emailVerification,changePassword } = require('../controllers/auth');

auth.post('/login', login);
auth.post('/refresh', refreshForToken);
auth.post('/register', register);
auth.post('/emailverification', emailVerification);
auth.post('/forgotpassword', forgotPassword);
auth.post('/changepassword',verifyAll,changePassword);

module.exports = auth;