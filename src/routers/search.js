const searchVehicle = require('express').Router();

const { getSearchVehicle } = require('../controllers/search');
searchVehicle.get('/', getSearchVehicle);

module.exports = searchVehicle;