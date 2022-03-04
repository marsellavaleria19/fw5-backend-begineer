const searchVehicle = require('express').Router();
const cors = require('cors');

const { getSearchVehicle } = require('../controllers/search');
searchVehicle.get('/', cors(), getSearchVehicle);

module.exports = searchVehicle;