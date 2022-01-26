const route = require('express').Router()
route.use('/vehiclerent', require('./vehicleRents'))
module.exports = route