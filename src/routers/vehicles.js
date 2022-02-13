const vehicles = require('express').Router();


const {
    getVehicles,
    getVehicle,
    getDataVehiclesByCategory,
    // insertVehicle,
    insertVehicleAsync,
    // updateVehicle,
    updateVehicleAsync,
    // updatePatchVehicle,
    updatePatchVehicleAsync,
    // deleteVehicle,
    deleteVehicleAsync
} = require('../controllers/vehicles');

vehicles.get('/', getVehicles);
vehicles.get('/category/:id', getDataVehiclesByCategory);
vehicles.get('/:id', getVehicle);
// vehicles.post('/', upload.single('photo'), insertVehicle);
vehicles.post('/', insertVehicleAsync);
// vehicles.put('/:id', updateVehicle);
vehicles.put('/:id', updateVehicleAsync);
// vehicles.patch('/:id', updatePatchVehicle);
vehicles.patch('/:id', updatePatchVehicleAsync);
// vehicles.delete('/:id', deleteVehicle);
vehicles.delete('/:id', deleteVehicleAsync);
module.exports = vehicles;