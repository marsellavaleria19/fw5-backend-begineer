const route = require('express').Router();
route.use('/auth', require('./auth'));
route.use('/vehicles', require('./vehicles'));
route.use('/users', require('./users'));
route.use('/histories', require('./histories'));
route.use('/profile', require('./profile'));
route.use('/popular', require('./popularVehicle'));
route.use('/categories', require('./categories'));
route.use('/payment-types', require('./paymentType'));
route.use('/status', require('./status'));
route.use('/locations', require('./location'));
route.use('/search', require('./search'));
route.get('/', (req, res) => {
    return res.json({
        success: true,
        message: 'Backend is running well!'
    });
});
module.exports = route;