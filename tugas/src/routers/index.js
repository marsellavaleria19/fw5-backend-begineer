const route = require('express').Router();
route.use('/vehicle', require('./vehicles'));
module.exports = route;