const profile = require('express').Router();
const getProfile = require('../controllers/profile');
const { verifyAll } = require('../helpers/auth');

profile.get('/', verifyAll, getProfile);

module.exports = profile;