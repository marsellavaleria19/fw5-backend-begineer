const vehicles = require('express').Router();

const {
    getVehicles,
    getVehicle,
    getDataVehiclesByCategory,
    // insertVehicle,
    insertVehicleAsync,
    // updateVehicle,
    updateVehicleAsync,
    updatePatchVehicle,
    deleteVehicle
} = require('../controllers/vehicles');

vehicles.get('/', getVehicles);
vehicles.get('/category/:id', getDataVehiclesByCategory);
vehicles.get('/:id', getVehicle);
// vehicles.post('/', upload.single('photo'), insertVehicle);
vehicles.post('/', insertVehicleAsync);
// vehicles.put('/:id', updateVehicle);
vehicles.put('/:id', updateVehicleAsync);
vehicles.patch('/:id', updatePatchVehicle);
vehicles.delete('/:id', deleteVehicle);
module.exports = vehicles;