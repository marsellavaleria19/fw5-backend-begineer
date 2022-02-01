const popularVehicle = require('express').Router();

const { getPopularVehicle } = require('../controllers/popularVehicle');
popularVehicle.get('/', getPopularVehicle);

module.exports = popularVehicle;