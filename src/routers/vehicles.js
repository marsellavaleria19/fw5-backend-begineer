const vehicles = require('express').Router();
const cors = require('cors');
const { verifyUser } = require('../helpers/auth');

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

vehicles.get('/', cors(), getVehicles);
vehicles.get('/category/:id', cors(), getDataVehiclesByCategory);
vehicles.get('/:id', cors(), getVehicle);
// vehicles.post('/', upload.single('photo'), insertVehicle);
vehicles.post('/', verifyUser, insertVehicleAsync);
// vehicles.put('/:id', updateVehicle);
vehicles.put('/:id', verifyUser, updateVehicleAsync);
// vehicles.patch('/:id', updatePatchVehicle);
vehicles.patch('/:id', verifyUser, updatePatchVehicleAsync);
// vehicles.delete('/:id', deleteVehicle);
vehicles.delete('/:id', verifyUser, deleteVehicleAsync);
module.exports = vehicles;