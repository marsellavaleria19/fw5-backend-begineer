const vehicles = require('express').Router();

const {
    getVehicles,
    getVehicle,
    getDataVehiclesByCategory,
    // insertVehicle,
    insertVehicleUpload,
    updateVehicle,
    updatePatchVehicle,
    deleteVehicle
} = require('../controllers/vehicles');

vehicles.get('/', getVehicles);
vehicles.get('/category/:id', getDataVehiclesByCategory);
vehicles.get('/:id', getVehicle);
// vehicles.post('/', upload.single('photo'), insertVehicle);
vehicles.post('/', insertVehicleUpload);
vehicles.put('/:id', updateVehicle);
vehicles.patch('/:id', updatePatchVehicle);
vehicles.delete('/:id', deleteVehicle);
module.exports = vehicles;