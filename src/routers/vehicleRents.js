const vehicleRents = require('express').Router()

const { getVehicleRents, getVehicleRent, insertVehicleRent, updateVehicleRent, deleteVehicleRent } = require('../controller/vehicleRents')

vehicleRents.get('/', getVehicleRents)
vehicleRents.get('/:id', getVehicleRent)
vehicleRents.post('/add', insertVehicleRent)
vehicleRents.put('/update/:id', updateVehicleRent)
vehicleRents.delete('/delete/:id', deleteVehicleRent)
module.exports = vehicleRents