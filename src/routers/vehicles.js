const vehicles = require('express').Router();

const { getVehicles, getVehicle, getDataVehiclesByCategory, insertVehicle, updateVehicle, updatePatchVehicle, deleteVehicle } = require('../controllers/vehicles');

vehicles.get('/', getVehicles);
vehicles.get('/category/:id', getDataVehiclesByCategory);
vehicles.get('/:id', getVehicle);
vehicles.post('/', insertVehicle);
vehicles.put('/:id', updateVehicle);
vehicles.patch('/:id', updatePatchVehicle);
vehicles.delete('/:id', deleteVehicle);
module.exports = vehicles;