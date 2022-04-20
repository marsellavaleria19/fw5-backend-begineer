const vehicles = require('express').Router();

const {
    //  getVehicles,
    getVehiclesAsync,
    getVehicleAsync,
    //  getVehicle,
    getDataVehiclesByCategoryAsync,
    getPopularVehicle,
    //  getDataVehiclesByCategory,
    // insertVehicle,
    insertVehicleAsync,
    // updateVehicle,
    updateVehicleAsync,
    // updatePatchVehicle,
    updatePatchVehicleAsync,
    // deleteVehicle,
    deleteVehicleAsync
} = require('../controllers/vehicles');

vehicles.get('/', getVehiclesAsync);
// vehicles.get('/', cors(), getVehicles);
vehicles.get('/popular', getPopularVehicle);
vehicles.get('/category/:id',getDataVehiclesByCategoryAsync);
// vehicles.get('/category/:id', cors(), getDataVehiclesByCategory);
vehicles.get('/:id', getVehicleAsync);

// vehicles.get('/:id', cors(), getVehicle);
// vehicles.post('/', upload.single('photo'), insertVehicle);
vehicles.post('/', insertVehicleAsync);
// vehicles.put('/:id', updateVehicle);
vehicles.put('/:id', updateVehicleAsync);
// vehicles.patch('/:id', updatePatchVehicle);
vehicles.patch('/:id', updatePatchVehicleAsync);
// vehicles.delete('/:id', deleteVehicle);
vehicles.delete('/:id', deleteVehicleAsync);
module.exports = vehicles;