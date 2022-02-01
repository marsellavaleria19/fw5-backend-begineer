const route = require('express').Router();
route.use('/vehicles', require('./vehicles'));
route.use('/users', require('./users'));
route.use('/histories', require('./histories'));
route.use('/profile', require('./profile'));
route.use('/popular', require('./popularVehicle'));
module.exports = route;