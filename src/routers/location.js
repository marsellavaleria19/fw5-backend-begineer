const locations = require('express').Router();
const { verifyAdmin } = require('../helpers/auth');

const {getLocations,getLocation,insertLocation,updateLocation,deleteLocation} = require('../controllers/location');
locations.get('/', getLocations);
locations.get('/:id', getLocation);
locations.post('/', verifyAdmin, insertLocation);
locations.put('/:id', verifyAdmin, updateLocation);
locations.delete('/:id', verifyAdmin, deleteLocation);

module.exports = locations;