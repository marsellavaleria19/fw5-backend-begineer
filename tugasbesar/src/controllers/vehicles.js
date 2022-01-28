const vehicleModel = require('../models/vehicles')

const getVehicles = (request, response) => {
    vehicleModel.getDataVehicles((results) => {
        return response.json({
            success: true,
            message: "List Data Vehicles ",
            results: results
        })
    })
}

const getVehicle = (request, response) => {
    vehicleModel.getDataVehicle((results) => {
        if (results.length > 0) {
            return response.json({
                success: true,
                message: "Detail Vehicle",
                results: results[0]
            })
        } else {
            return response.status(404).json({
                success: true,
                message: "Detail Vehicle",
                results: results[0]
            })
        }
    })
}

const insertVehicle = (request, response) => {
    const data = {
        name: request.body.name,
        idCategory: request.body.idCategory,
        photo: request.body.photo,
        location: request.body.location,
        price: request.body.price,
        stock: request.body.stock,
        status: request.body.status
    }
    vehicleModel.insertDataVehicle(data, (results) => {
        if (results.affectedRows > 0) {
            return response.json({
                success: true,
                message: "Data Vehicle entered successfully.",
            })
        } else {
            return response.status(500).json({
                success: false,
                message: "Data Vehicle failed to enter"
            })
        }
    })
}

const updateVehicle = (request, response) => {
    const { id } = request.params
    const data = {
        name: request.body.name,
        idCategory: request.body.idCategory,
        photo: request.body.photo,
        location: request.body.location,
        price: request.body.price,
        stock: request.body.stock,
        status: request.body.status
    }
    vehicleModel.getDataVehicle(id, (results) => {
        if (results.length > 0) {
            vehicleModel.updateDataVehicle(id, data, (results) => {
                if (results.affectedRows > 0) {
                    return response.json({
                        success: true,
                        message: "Data Vehicle updated sucessfully."
                    })
                } else {
                    return response.status(500).json({
                        success: false,
                        message: "Data Vehicle failed to update."
                    })
                }
            })
        } else {
            return response.status(404).json({
                success: false,
                message: "Data Vehicle not found."
            })
        }
    })
}

const deleteVehicle = (request, response) => {
    const { id } = request.params
    vehicleModel.getDataVehicle(id, (results) => {
        if (results.length > 0) {
            vehicleModel.deleteDataVehicle(id, (results) => {
                if (results.affectedRows > 0) {
                    return response.json({
                        success: true,
                        message: "Data Vehicle deleted successfully."
                    })
                } else {
                    return response.status(500).json({
                        success: false,
                        message: "Data Vehicle failed to delete."
                    })
                }
            })
        } else {
            return response.status(404).json({
                success: false,
                message: "Data Vehicle not found."
            })
        }
    })
}

module.exports = {
    getVehicles,
    getVehicle,
    insertVehicle,
    updateVehicle,
    deleteVehicle
}