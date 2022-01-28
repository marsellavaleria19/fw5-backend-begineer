const vehicles = require('express').Router();

const { getVehicles, getVehicle, insertVehicle, updateVehicle, deleteVehicle } = require('../controller/vehicles');

vehicles.get('/', getVehicles);
vehicles.get('/:id', getVehicle);
vehicles.post('/add', insertVehicle);
vehicles.put('/update/:id', updateVehicle);
vehicles.delete('/delete/:id', deleteVehicle);
module.exports = vehicles;