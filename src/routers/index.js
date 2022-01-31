const route = require('express').Router();
route.use('/vehicleS', require('./vehicles'));
route.use('/users', require('./users'));
module.exports = route;