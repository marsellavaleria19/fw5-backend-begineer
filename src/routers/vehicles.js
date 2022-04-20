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
vehicles.post('/', insertVehicleAsync); // verify admin in controller
// vehicles.put('/:id', updateVehicle);
vehicles.put('/:id', updateVehicleAsync); // verify admin in controller
// vehicles.patch('/:id', updatePatchVehicle);
vehicles.patch('/:id', updatePatchVehicleAsync); // verify admin in controller
// vehicles.delete('/:id', deleteVehicle);
vehicles.delete('/:id', deleteVehicleAsync);  // verify admin in controller
module.exports = vehicles;