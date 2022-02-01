const profile = require('express').Router();

const getProfile = require('../controllers/profile');
profile.get('/:id', getProfile);

module.exports = profile;