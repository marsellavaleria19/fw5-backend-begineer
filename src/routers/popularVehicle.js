const popularVehicle = require('express').Router();
const cors = require('cors');

const { getPopularVehicle } = require('../controllers/popularVehicle');
popularVehicle.get('/', cors(), getPopularVehicle);

module.exports = popularVehicle;