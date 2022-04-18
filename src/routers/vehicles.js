const vehicles = require('express').Router();
const { verifyAdmin } = require('../helpers/auth');

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
vehicles.post('/', verifyAdmin, insertVehicleAsync);
// vehicles.put('/:id', updateVehicle);
vehicles.put('/:id', verifyAdmin, updateVehicleAsync);
// vehicles.patch('/:id', updatePatchVehicle);
vehicles.patch('/:id', verifyAdmin, updatePatchVehicleAsync);
// vehicles.delete('/:id', deleteVehicle);
vehicles.delete('/:id', verifyAdmin, deleteVehicleAsync);
module.exports = vehicles;