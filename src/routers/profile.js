const profile = require('express').Router();

const getProfile = require('../controllers/profile');
const { verifyUser } = require('../helpers/auth');
profile.get('/', verifyUser, getProfile);

module.exports = profile;